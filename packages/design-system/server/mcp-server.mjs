/**
 * Serves the built Storybook, plus a real MCP endpoint at /mcp.
 *
 * Why this exists: `@storybook/addon-mcp` registers a single `devServer` preset
 * hook, which Storybook core applies only on the `storybook dev` path — never for
 * `storybook build`. So in a static deployment the addon's `/mcp` cannot exist, and
 * an nginx-only image answers `/mcp` with the SPA fallback (HTML, HTTP 200), which
 * is what a client sees as a broken server rather than a missing one.
 *
 * The addon's own dependency, `@storybook/mcp`, is a different story: it exports
 * `createStorybookMcpHandler()`, a framework-agnostic fetch handler that serves the
 * documentation toolset (`list-all-documentation`, `get-documentation`) straight
 * from the manifests the static build already emits (`manifests/components.json`,
 * `manifests/docs.json`). This server mounts that handler and otherwise behaves
 * like the nginx it replaces: static files, SPA fallback, the same cache headers,
 * gzip.
 *
 * Not available here: the addon's dev-only tools (`get-story-urls`,
 * `get-ui-building-instructions`), which need a running dev server.
 *
 * Env: PORT (default 8080), STORYBOOK_STATIC_DIR (default ./storybook-static).
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";
import { extname, join, normalize, resolve, sep } from "node:path";
import { createStorybookMcpHandler } from "@storybook/mcp";

const PORT = Number(process.env.PORT ?? 8080);
const ROOT = resolve(process.env.STORYBOOK_STATIC_DIR ?? "storybook-static");
const MCP_PATHS = new Set(["/mcp", "/mcp/"]);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".mp4": "video/mp4",
};

// Content-hashed, so it can never change under a given URL. Mirrors the `expires 30d`
// + `immutable` pair the previous nginx config set for the same extensions.
const IMMUTABLE = new Set([
  ".js", ".mjs", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
  ".woff", ".woff2", ".ttf", ".otf", ".webp", ".map",
]);

const COMPRESSIBLE = /^(text\/|application\/(json|javascript|xml|manifest\+json))/;

const mcp = await createStorybookMcpHandler();

function readBody(req) {
  return new Promise((done, fail) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => done(Buffer.concat(chunks)));
    req.on("error", fail);
  });
}

async function handleMcp(req, res) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? `localhost:${PORT}`}`);
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers.set(name, value);
  }

  const method = req.method ?? "GET";
  const hasBody = method !== "GET" && method !== "HEAD";
  const request = new Request(url, {
    method,
    headers,
    body: hasBody ? await readBody(req) : undefined,
  });

  const response = await mcp(request, {});
  const outHeaders = Object.fromEntries(response.headers);
  // The read-only documentation toolset is safe to call from browser-based clients.
  outHeaders["access-control-allow-origin"] = "*";
  res.writeHead(response.status, outHeaders);
  if (response.body) {
    // Streamed rather than buffered: an SSE response never completes.
    for await (const chunk of response.body) res.write(chunk);
  }
  res.end();
}

/** @returns whether the file was served. */
async function sendFile(req, res, path, status = 200) {
  const info = await stat(path).catch(() => null);
  if (!info?.isFile()) return false;

  const ext = extname(path).toLowerCase();
  const type = CONTENT_TYPES[ext] ?? "application/octet-stream";
  const headers = {
    "content-type": type,
    "cache-control": IMMUTABLE.has(ext) ? "public, max-age=2592000, immutable" : "no-cache",
  };

  const gzip = COMPRESSIBLE.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  if (gzip) headers["content-encoding"] = "gzip";
  else headers["content-length"] = String(info.size);

  res.writeHead(status, headers);
  if (req.method === "HEAD") {
    res.end();
    return true;
  }

  const source = createReadStream(path);
  await pipeline(source, ...(gzip ? [createGzip()] : []), res);
  return true;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? `localhost:${PORT}`}`);
    const pathname = decodeURIComponent(url.pathname);

    if (MCP_PATHS.has(pathname)) {
      if (req.method === "OPTIONS") {
        res.writeHead(204, {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
          "access-control-allow-headers": "*",
        });
        res.end();
        return;
      }
      await handleMcp(req, res);
      return;
    }

    if (pathname === "/health") {
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      res.end("ok\n");
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { allow: "GET, HEAD, POST" });
      res.end("Method Not Allowed\n");
      return;
    }

    const relative = normalize(pathname).replace(/^[/\\]+/, "");
    const candidates =
      relative === "" || pathname.endsWith("/")
        ? [join(ROOT, relative, "index.html")]
        : [join(ROOT, relative), join(ROOT, relative, "index.html")];

    for (const candidate of candidates) {
      if (!candidate.startsWith(ROOT + sep)) break; // never escape the root
      if (await sendFile(req, res, candidate)) return;
    }

    // SPA fallback, as nginx did with `try_files $uri $uri/ /index.html` — but only
    // for navigations: a missing hashed asset must 404 rather than return HTML.
    if (extname(relative) === "") {
      if (await sendFile(req, res, join(ROOT, "index.html"))) return;
    }

    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not Found\n");
  } catch (error) {
    if (res.headersSent) {
      res.destroy();
      return;
    }
    console.error("[storybook-server]", error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error\n");
  }
});

server.listen(PORT, () => {
  console.log(`[storybook-server] listening on :${PORT} (static: ${ROOT}, mcp: /mcp)`);
});
