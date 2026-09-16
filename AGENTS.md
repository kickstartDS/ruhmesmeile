# AGENTS.md

Canonical instruction file for AI agents working in this repository. Copilot, Claude Code, Cursor, and other AGENTS.md-aware tools read this file; `.github/copilot-instructions.md` and `CLAUDE.md` are thin pointers here.

Deeper, package-local rules live in nested `AGENTS.md` files (nearest file wins):

| Area | File |
| --- | --- |
| Next.js site | [packages/website/AGENTS.md](packages/website/AGENTS.md) |
| Design system | [packages/design-system/AGENTS.md](packages/design-system/AGENTS.md) |
| Shared Storyblok library | [packages/storyblok-services/AGENTS.md](packages/storyblok-services/AGENTS.md) |
| Storyblok MCP server | [packages/storyblok-mcp/AGENTS.md](packages/storyblok-mcp/AGENTS.md) |
| Design tokens MCP | [packages/design-tokens-mcp/AGENTS.md](packages/design-tokens-mcp/AGENTS.md) |
| Token editor | [packages/design-tokens-editor/AGENTS.md](packages/design-tokens-editor/AGENTS.md) |
| Schema layer editor | [packages/schema-layer-editor/AGENTS.md](packages/schema-layer-editor/AGENTS.md) |
| n8n community node | [packages/storyblok-n8n/AGENTS.md](packages/storyblok-n8n/AGENTS.md) |
| Component builder MCP | [packages/component-builder-mcp/AGENTS.md](packages/component-builder-mcp/AGENTS.md) |
| JWT auth library | [packages/shared-auth/AGENTS.md](packages/shared-auth/AGENTS.md) |
| Token graph library | [packages/token-graph/AGENTS.md](packages/token-graph/AGENTS.md) |
| Storyblok field plugins | [theme-select](packages/storyblok-theme-select-field-plugin/AGENTS.md) · [icon-sprite](packages/storyblok-icon-sprite-picker-field-plugin/AGENTS.md) · [sharepoint-folder](packages/storyblok-sharepoint-folder-picker-field-plugin/AGENTS.md) |

## What this repository is

**ruhmesmeile.com's production repository.** A pnpm-workspaces monorepo that turns a kickstartDS design system plus a Storyblok space into the live site, and carries the website-accelerator tooling around it. It started as a copy of the `ruhmesmeile-storyblok-starter` accelerator — see [Adopting this starter for a new site](#adopting-this-starter-for-a-new-site).

Layers:

```
Storyblok CMS ──► storyblok-services (schema, transform, validate, generate)
      ▲                    ▲            ▲              ▲
      │                    │            │              │
  website (Next.js)   storyblok-mcp  storyblok-n8n   prompter API routes
      │                    │
      └── design-system ◄──┘   (74+ components, 76 JSON Schemas, tokens, Storybook)
                 ▲
   design-tokens-mcp · design-tokens-editor · schema-layer-editor · token-graph
                 ▲
            shared-auth (JWT, HS256) ── 3 MCP servers + design-tokens-editor
```

## Packages

| Directory | Package name | Published | Purpose |
| --- | --- | --- | --- |
| `packages/website` | `@kickstartds/ruhmesmeile-storyblok-starter` | changeset-ignored | **This site's production app.** Next.js 13.5.6 (pages router, React 19), ISR, Visual Editor, Prompter. Deployed to ruhmesmeile.com — see [Deployment](#deployment) |
| `packages/design-system` | `@kickstartds/design-system` | yes | 72 component dirs + 6 CMS page components, tokens, Storybook 10, Playroom. Vendored and branded for this site — see [packages/design-system/AGENTS.md](packages/design-system/AGENTS.md) |
| `packages/storyblok-services` | `@kickstartds/storyblok-services` | yes | Schema prep, transforms, validation, patterns, guidance, plan/generate, assets, themes |
| `packages/storyblok-mcp` | `@kickstartds/storyblok-mcp-server` | yes | MCP server: 32 tools + 7 app-only tools, 4+ dynamic resources, 7 prompts |
| `packages/design-tokens-mcp` | `@kickstartds/design-tokens-mcp` | yes | MCP server: 28 token tools, 4 resources, 3 prompts, 13 intent rules |
| `packages/component-builder-mcp` | `@kickstartds/component-builder-mcp` | yes | Read-only MCP server: 10 scaffolding/instruction tools, 3 resources |
| `packages/storyblok-n8n` | `n8n-nodes-storyblok-kickstartds` | yes (npm) | n8n community node: 28 operations across 4 resources, 10 workflow templates |
| `packages/design-tokens-editor` | `@kickstartds/design-tokens-editor` | private | Vite SPA + Express: visual token/theme editor, Storyblok Management API |
| `packages/schema-layer-editor` | `@kickstartds/schema-layer-editor` | private | Vite SPA + Express: edits CMS schema layers (`visibility`, `language`) |
| `packages/token-graph` | `@kickstartds/token-graph` | private | Sigma/graphology token-graph visualization, built into design-system |
| `packages/shared-auth` | `@kickstartds/shared-auth` | private | HS256 verification, revocation, OAuth 2.1 layer for MCP clients |
| `packages/storyblok-*-field-plugin` | `@kickstartds/storyblok-*-field-plugin` | private | 3 Storyblok field plugins (theme select, icon sprite picker, SharePoint folder picker) |
| `packages/umami-analytics` | — | n/a | **Not a workspace package** (no `package.json`): Dockerfile over the upstream Umami image |

## Setup

Requirements: **Node 24** (`.nvmrc`; every package that declares `engines` requires `>= 24.0.0` — the website, `token-graph`, and the field plugins declare none) and **pnpm 10.30.3** (`corepack enable && corepack prepare pnpm@10.30.3 --activate`). `mkcert` is required for local SSL (Storyblok Visual Editor iframes `https://localhost:3010`) — `mkcert -cert-file localhost.pem -key-file localhost-key.pem localhost 127.0.0.1 ::1` inside `packages/website`.

**The website itself runs on Node 18** (`packages/website/Dockerfile` uses `node:18-alpine`), and Next 13.5.6's `res.setPreviewData` breaks on Node 24, so run the website's `next dev` on Node 18 whenever you need the Visual Editor preview. Details in [packages/website/AGENTS.md](packages/website/AGENTS.md#runtime-the-website-runs-on-node-18-the-tooling-on-node-24).

```bash
pnpm install
pnpm -r run build      # topological; required before first dev run
```

**Before the first `dev` run**, generate the token/asset artifacts — they are produced by `build`, not by `dev`, and the app otherwise fails to compile with `Can't resolve '@/token/calculated'`:

```bash
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter build-tokens
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter sync-default-theme   # also upserts the Storyblok default theme
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter extract-tokens
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter blurhashes
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter bundle-static-assets
```

Website environment: copy `packages/website/.env.local.sample` → `.env.local`. Required: `NEXT_STORYBLOK_API_TOKEN`, `NEXT_STORYBLOK_OAUTH_TOKEN`, `NEXT_STORYBLOK_SPACE_ID`. AI features need `NEXT_OPENAI_API_KEY`; Markdown endpoints need `NEXT_PUBLIC_SITE_URL`. Committed `packages/website/.env` holds this site's `NEXT_PUBLIC_*` domains, the Docker image name, and `HOSTING_SERVER_IP`. Scripts wrapped in `dotenvx run -f .env.local` fail without it — and `dotenvx` never overrides an already-set variable, so prefixing a command with `NEXT_STORYBLOK_OAUTH_TOKEN= …` is the way to make the Storyblok-writing steps take their skip path.

Storyblok CLI requires a one-time `pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter storyblok-login` (region `eu`).

## Commands

**pnpm filter selectors must be full package names or paths.** Bare directory names do **not** resolve (`pnpm --filter website …` → "No projects matched the filters") — the website package is `@kickstartds/ruhmesmeile-storyblok-starter`, the MCP server is `@kickstartds/storyblok-mcp-server`. `--filter schema-layer-editor` happens to work because the scope-stripped name is unique. Working forms:

```bash
# Dev servers
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter dev   # Next :3000 + SSL proxy :3010
pnpm --filter ./packages/website dev                           # equivalent
pnpm --filter @kickstartds/design-system storybook             # Storybook :6006
pnpm --filter @kickstartds/design-system playroom              # Playroom :9000
pnpm --filter @kickstartds/storyblok-mcp-server start          # MCP over stdio (dev = tsc --watch only)
pnpm --filter @kickstartds/design-tokens-mcp dev
pnpm --filter @kickstartds/design-tokens-editor dev            # SPA :5173 + API :4200
pnpm --filter @kickstartds/schema-layer-editor dev             # SPA :4200 + API :4201
pnpm --filter @kickstartds/schema-layer-editor dev -- --schemas packages/website/node_modules/@kickstartds/design-system/dist/components --schemas-extra packages/website/components --namespace visibility --layer packages/website/cms/visibility
# (`pnpm layer-editor visibility` is the root alias for the above and resolves)

# Quality (see "Testing reality" before trusting these)
pnpm -r run typecheck
pnpm -r run test
pnpm -r run lint

# Publishing
pnpm changeset && pnpm version-packages && pnpm publish-packages
```

Full per-package command sets: `packages/*/package.json` and [packages/website/AGENTS.md](packages/website/AGENTS.md).

## Architecture invariants

These hold across packages; violating them produces invalid CMS content or broken builds.

1. **`component` is the only CMS discriminator.** `type` is reserved for user-facing variants (e.g. CTA style). `processForStoryblok()` moves `type` → `component` and strips leftovers.
2. **Schema-derived, never hardcoded.** Component names, nesting rules, content types, and validation rules are derived from dereferenced JSON Schemas (`storyblok-services/src/registry.ts`, `validate.ts`). Root content types: `page`, `blog-post`, `blog-overview`, `event-detail`, `event-list`. Do not add hardcoded component lists.
3. **Storyblok props are flat.** Always `unflatten()` before rendering; `flatten()` to go back. `image_src` → `image.src`.
4. **All shared content logic lives in `@kickstartds/storyblok-services`.** Website API routes, the MCP server, and the n8n node import the same functions — identical validation and transforms everywhere. New shared behavior goes there, not into a consumer.
5. **Components are pure and Context-overridable.** No React state; client behavior is vanilla JS in `*.client.ts`/`*.client.js`. SCSS is imported globally (`index.scss`), never from components.
6. **Token layers are fixed:** branding `--ks-brand-*` → semantic `--ks-*` → component `--dsa-*`. Stay inside existing tokens; never invent values.
7. **Validation + compositional warnings run on every write tool**; `skipValidation: true` is the only escape hatch.
8. **Auth is opt-in and shared.** `MCP_JWT_SECRET` unset ⇒ auth disabled (local dev). One secret, one revocation list (`MCP_REVOKED_TOKENS`). Never add a per-service auth mechanism.
9. **Never push unmerged generated CMS config.** Always regenerate → merge → push (see [docs/adr/adr-storyblok-config-merge.md](docs/adr/adr-storyblok-config-merge.md)).
10. **`storyProcessing` flattens asset and link fields.** Before any component sees them, `packages/website/helpers/storyblok.ts` rewrites asset objects into plain CDN URL strings (except inside `seo` components) and multilinks into plain URL strings. A new component must therefore accept `image` as a **string** (`src={image}`), not `image.filename`, and read links as strings — even though the JSON Schema declares them as assets/URIs and the CMS API returns objects. `media` sub-fields also get their `alt` copied onto a sibling `alt` key when the component has one.

## Generated files — never hand-edit

| Artifact | Regenerate with |
| --- | --- |
| `packages/website/cms/{components,presets}.generated.json`, `cms/merged/`, `cms/merge-report.json` | `pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter create-storyblok-config` / `… update-storyblok-config` |
| `packages/website/types/components.*.json` | `… pull-content-schema` |
| `packages/website/types/components-schema.d.ts` | `… generate-content-types` |
| `packages/website/token/{tokens.css,tokens.js,components.js,calculated.js,InlineIcon.tsx,storybook/}` | `… build-tokens` / `… extract-tokens` |
| `packages/website/public/blurhashes/`, `public/client.js`, `public/_/` | `… blurhashes` / `… bundle-static-assets` |
| `packages/design-system/dist/`, `src/types`, `src/token/branding-tokens.css`, `src/token/token-graph.json`, `snippets.json`, `static/pagefind` | `pnpm --filter @kickstartds/design-system build` |
| `packages/design-system/__snapshots__/`, `static/img/screenshots/` | `build-storybook` → `create-component-previews` (Git LFS tracked) |
| `packages/storyblok-mcp/schemas/*.dereffed.json`, `src/ui/*.generated.ts` | `… sync-schemas` / `extract-tokens` / `bundle-render` |
| `packages/design-tokens-mcp/tokens/` | `pnpm --filter @kickstartds/design-tokens-mcp sync-tokens` |

**Build order for anything that reads design-system output.** The website's `kickstartDS schema …` / `cms storyblok` scripts (`create-storyblok-config`, `generate-props`, `dereference-schemas`, `update-storyblok-config`) resolve the design system through `packages/website/node_modules/@kickstartds/design-system/dist/`, which `injectWorkspacePackages` only populates at install time. Order: **build design-system → `pnpm install` → schema/CMS tooling → website build.** Skipping the re-install fails with `Couldn't find a reffed json in json allOf graph generation`.

The **website image is exempt**: `packages/website/Dockerfile` builds the design system from source in its own stage and re-injects it, so `docker build` works from a clean checkout with no host-side `dist`. `.dockerignore` excludes `packages/design-system/dist` for that reason.

## Destructive commands — confirm before running

- `pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter init` → `packages/website/scripts/prepareProject.js`: **deletes stories, components, and asset folders in the live Storyblok space**, uploads presets. Fresh spaces only (it exits if a default "Home" story exists). Note `pnpm --filter … init` hits pnpm's own built-in `init`; the seed script needs `pnpm --filter … run init`.
- `update-storyblok-config`, `push-components`, `push-component` → write the live CMS schema.
- `generate-content-types` → pulls live schema, overwrites `types/`.
- `sync-default-theme` → writes the default `token-theme` story, but only when it actually differs from what the design system compiles (it compares the story's `tokens` structurally — the CMS returns them as a string, and the stories *list* endpoint omits `content` entirely, so the check fetches the story by id first).
- `pnpm --filter @kickstartds/design-system create-component-previews` → `test` **wipes `__snapshots__/`** before re-capturing; requires a prior `build-storybook` (and `pnpm exec playwright install`).
- `bash scripts/purge-history.sh` → `git-filter-repo` rewrite + force-push.

## Testing reality

Not every package has meaningful tests. Current state (verify before relying on it):

| Package | `test` | Notes |
| --- | --- | --- |
| `storyblok-services`, `storyblok-mcp` | Jest | `NODE_OPTIONS=--experimental-vm-modules`. `packages/storyblok-mcp/test/prompts.test.ts:20` asserts **6** prompts while `packages/storyblok-mcp/src/prompts.ts` defines **7** (`theme-management`) — this test fails today. |
| `storyblok-n8n` | Jest | `lint` script calls `eslint` but the package has no eslint dependency or config → lint fails. |
| `design-system` | image snapshots | `rimraf __snapshots__ && run-p -r test:*`; needs a built `storybook-static/`. CI's `build` does not produce it. |
| `schema-layer-editor` | Vitest | 2 test files (schema tree, content-type classification). |
| `component-builder-mcp`, `design-tokens-mcp` | none | `test` is `echo "Error: no test specified" && exit 1` — so `pnpm -r run test` can never pass. |
| `website`, editors, field plugins, `shared-auth`, `token-graph` | none | Use `typecheck` plus a runtime smoke test. |

GitHub CI (`.github/workflows/ci.yml`) runs `install --frozen-lockfile` → `-r build` → `-r typecheck` → `-r test` → `-r lint` on **Node 20**, while `.nvmrc` and the declared engines require Node 24; `-r test`/`-r lint` are red for the reasons above. CircleCI (`.circleci/config.yml`) is what deploys the site — see below.

## Deployment

Kamal, one config per service (`config/deploy-*.yml`), shared secrets in `.kamal/secrets`. There is no default `config/deploy.yml` — **use `-c`, not `-d`.** Kamal 2 destinations resolve `config/deploy.<destination>.yml`, so the hyphenated filenames in this repo are *not* found by `kamal deploy -d website` (it fails with "Configuration file not found in config/deploy.yml"). Always pass the file explicitly.

| Command | Service (kamal-proxy app) | Domain env var | Port | Dockerfile |
| --- | --- | --- | --- | --- |
| `kamal deploy -c config/deploy-website.yml` | `website` (`website-web`) | `NEXT_PUBLIC_PRIMARY_PUBLIC_SITE_DOMAIN` | 3030 | `packages/website/Dockerfile` |
| `kamal deploy -c config/deploy-legacy.yml` | `legacy` (`legacy-web`) | — (fixed host) | 80 | `Dockerfile.legacy` |
| `kamal deploy -c config/deploy-storyblok-mcp.yml` | MCP | `MCP_PUBLIC_DOMAIN` | 8080 | `packages/storyblok-mcp/Dockerfile` |
| `kamal deploy -c config/deploy-design-tokens-mcp.yml` | MCP | `DESIGN_TOKENS_MCP_PUBLIC_DOMAIN` | 8080 | `packages/design-tokens-mcp/Dockerfile` |
| `kamal deploy -c config/deploy-component-builder-mcp.yml` | MCP | `COMPONENT_BUILDER_MCP_PUBLIC_DOMAIN` | 8080 | `packages/component-builder-mcp/Dockerfile` |
| `kamal deploy -c config/deploy-design-tokens-editor.yml` | editor | `DESIGN_TOKENS_EDITOR_PUBLIC_DOMAIN` | 8080 | `packages/design-tokens-editor/Dockerfile` |
| `kamal deploy -c config/deploy-schema-layer-editor.yml` | editor | `SCHEMA_LAYER_EDITOR_PUBLIC_DOMAIN` | 8080 | `packages/schema-layer-editor/Dockerfile` |
| `kamal deploy -c config/deploy-design-system.yml` | Storybook | `STORYBOOK_PUBLIC_DOMAIN` | 8080 | `packages/design-system/Dockerfile` |
| `kamal deploy -c config/deploy-umami-analytics.yml` | `analytics` | `NEXT_PUBLIC_ANALYTICS_DOMAIN` | 3000 | `packages/umami-analytics/Dockerfile` |

### This site

| | |
| --- | --- |
| Hosts | `www.ruhmesmeile.com` (primary), `ruhmesmeile.com` (308 → primary), `legacy.ruhmesmeile.com` |
| Server | `91.98.115.152` (`root`, Hetzner Nürnberg), one `kamal-proxy` serving every app on the box |
| Website app | `website-web`, image `ruhmesmeile/ruhmesmeile-website`, port 3030, healthcheck `/api/up` |
| Deploy | Two paths, both ending in CircleCI `kamal deploy -c config/deploy-website.yml`: a push to `main` (branch-filtered to `main`), and a Storyblok content publish (project webhook trigger). From a workstation, source `packages/website/.env` + `.env.local` first so the ERB in `config/deploy-website.yml` resolves |
| Analytics | `usage.ruhmesmeile.com` (Umami on a different host), website id `6450847a-97a3-49ee-ab76-0b0ec4ee98e3` |
| Storyblok | space `297364`, region `eu` |
| Legacy site | `legacy.ruhmesmeile.com` — frozen pre-migration snapshot, see below |

**Content publishes deploy the site.** Storyblok fires on `story.published`, `story.unpublished`, `story.deleted` and `story.moved` for **every** story in the space — no slug filter — so any editor action that changes what the site renders rebuilds and redeploys production. In the space that is a `Circle CI` webhook endpoint (which deploys) and an older `Netlify` one subscribed to the same four actions. `.circleci/deploy-trigger.rb` runs before the deploy for content-triggered pipelines only, and does two things a code push never gets: it **halts** any run a newer run will supersede (a bulk publish or folder move fires one webhook per story, and every one of them used to build and redeploy — 27 pipelines from one content migration, 19 deploys of a single commit), and it deploys a content rebuild under a unique version, `<sha12>_content_<UTC>`. The unique tag matters: a content rebuild otherwise ships under the *same* tag as the previous build, and kamal runs `docker image rm --force` + `docker pull` on that tag *before* it takes the deploy lock, so two concurrent runs delete each other's image and fail with `Image … is missing the 'service' label`.

 ### Auxiliary services

The five services below share the box with the site; each is one kamal-proxy app on port 8080 with its own host. Image names and hosts live in the committed, secret-free `packages/website/.env`, secrets in `.env.local` + `.kamal/secrets` (names only).

| Service | Host | Image |
| --- | --- | --- |
| Storyblok MCP | `storyblok-mcp.ruhmesmeile.com` | `ruhmesmeile/ruhmesmeile-storyblok-mcp` |
| Design Tokens MCP | `design-tokens-mcp.ruhmesmeile.com` | `ruhmesmeile/ruhmesmeile-design-tokens-mcp` |
| Component Builder MCP | `component-builder-mcp.ruhmesmeile.com` | `ruhmesmeile/ruhmesmeile-component-builder-mcp` |
| Design System (Storybook) | `ds.ruhmesmeile.com` | `ruhmesmeile/ruhmesmeile-design-system-storybook` |
| Design Tokens Editor | `design.ruhmesmeile.com` | `ruhmesmeile/ruhmesmeile-design-tokens-editor` |

Deploy **from a workstation**, one at a time (kamal takes a deploy lock, and concurrent runs race on the image tag):

```bash
set -a; . packages/website/.env; . packages/website/.env.local; set +a
kamal deploy -c config/deploy-storyblok-mcp.yml        # one of the five
```

**`storyblok-mcp` needs a host-side design-system build first** — `pnpm --filter @kickstartds/design-system build` — because its Dockerfile copies `packages/design-system/dist` (token extraction and SSR component bundling). `.dockerignore` keeps that tree in the context and excludes only `dist/static` (~105 MB of screenshots); excluding the whole tree is what broke this image once. The other four build from source and need nothing extra.

**Auth is opt-in and shared.** All three MCPs and the editor verify `Authorization: Bearer <jwt>` (HS256, `packages/shared-auth`) **only when `MCP_JWT_SECRET` is set**; without it they serve unauthenticated and log `WARNING: MCP_JWT_SECRET is not set — HTTP endpoints are unauthenticated`. With it set, the Storyblok MCP (CMS write access + OpenAI spend) and the tokens MCP (branding-token writes) are the ones that matter. Issue tokens with `node scripts/issue-token.mjs --user <name> --role admin|reader [--expires 90d]` (needs `MCP_JWT_SECRET` in the environment), revoke by listing the token's `jti` in `MCP_REVOKED_TOKENS`. The Storybook has no auth and bakes a public Storyblok preview token into its bundle by design.

Smoke tests are in `docs/guides/design-tokens-mcp-deployment.md` — `GET /health`, then `POST /mcp` with a JSON-RPC `initialize`, `tools/list`, `tools/call`. The editor's is `GET /api/health`.

 **Legacy reference site.** `legacy.ruhmesmeile.com` is an immutable `next export` snapshot of the site as it was before the monorepo migration, served by nginx. It is the visual reference for every migration review, so **do not redeploy or extend it**. Branch `legacy-site`, tag `legacy-v1`, `Dockerfile.legacy`, `legacy-nginx.conf`, `config/deploy-legacy.yml`, image `ruhmesmeile/ruhmesmeile-legacy-website`. Two things are worth knowing: the export had to drop `pages/server-sitemap.xml` through `exportPathMap` (it is server-rendered and `next export` refuses it) and the static export had to be committed to that branch because Kamal builds from a `git clone` of the repo, not the working tree.

### Local ports

`3000` Next dev · `3010` website SSL proxy · `3030` website container · `5173` token editor SPA (proxies `/api` → `4200`) · `4200` token editor API **or** schema-layer-editor SPA (**collision — do not run both**) · `4201` schema-layer-editor API · `5432` Umami Postgres · `6006` Storybook (+ `/mcp`) · `8080` all hosted MCP/editor containers, field-plugin dev · `9000` Playroom.

## Documentation map

- [GETTINGSTARTED.md](GETTINGSTARTED.md) — Storyblok space setup, init flow, screenshots, deployment.
- [docs/README.md](docs/README.md) — index of guides, skills, ADRs, internal docs.
- `docs/adr/` — **12 architecture decision records; read the relevant one before changing tokens, auth, CMS config merging, or the MCP module layout.** Load-bearing: `adr-jwt-auth`, `adr-unified-theming`, `adr-storyblok-config-merge`, `adr-monorepo-integration`, `adr-mcp-apps-decisions`, `adr-cosmos-token-graph`, `adr-component-token-editor`, `adr-optoma-upstreaming`.
- `docs/guides/authentication.md` — JWT/OAuth setup, client config, revocation.
- `docs/guides/content-operations-workflows.md` — 14 n8n + MCP automation workflows (English intro, German workflow titles) plus an MCP tool reference.
- `docs/skills/*.md` — 6 German editor-facing workflows mapping to MCP prompts.
- `docs/internal/` — PRDs, plans, checklists, research. **Status headers are unreliable** (several say "Draft" for shipped work); treat code as ground truth.

## Known defects (documented, not fixed)

1. `packages/storyblok-mcp/test/prompts.test.ts` expects 6 prompts; source defines 7.
2. `pnpm -r run test` / `pnpm -r run lint` cannot pass (placeholder scripts, missing eslint setup, snapshot build prerequisite).
3. GitHub CI pins Node 20 while `.nvmrc` and package `engines` require Node 24.
4. `packages/design-tokens-mcp/docker-compose.yml` sets `PORT=3000` while the server reads `MCP_PORT` (8080); its healthcheck targets the wrong port.
5. `packages/design-tokens-editor/README.md` claims Netlify Functions/Blobs deployment; the real deployment is Express + Kamal.
6. `packages/schema-layer-editor/src/cli.ts` ignores `SCHEMA_LAYER_NAMESPACE`/`SCHEMA_LAYER_PORT`; the Dockerfile hardcodes them.
7. `packages/website/netlify.toml` still carries a redirect list that no longer applies: the domain is served by Kamal, not Netlify. The live redirects live in `packages/website/next.config.js`.

## Adopting this starter for a new site

1. **Storyblok**: create an empty space, note the Preview API token, personal access token, and space ID; run `storyblok-login` (region `eu` by default, `STORYBLOK_REGION`).
2. **Branding**: edit `packages/design-system/src/token/branding-tokens.json` (the authoritative brand layer — see [packages/design-system/AGENTS.md](packages/design-system/AGENTS.md)); rebuild tokens and `sync-default-theme`.
3. **Domains/infra**: `packages/website/.env` (`NEXT_PUBLIC_PRIMARY/SECONDARY_PUBLIC_SITE_DOMAIN`, `NEXT_PUBLIC_ANALYTICS_*`, `DOCKER_SITE_IMAGE_NAME`, `HOSTING_SERVER_IP`) and the domain/image env vars in each `config/deploy-*.yml`.
4. **Package names**: rename `@kickstartds/ruhmesmeile-storyblok-starter` (and Storyblok MCP/image names) if you publish or deploy under your own scope; update root aliases, `.circleci/config.yml`, `packages/website/Dockerfile`, `packages/website/next.config.js` and `.changeset/config.json` together.
5. **Components**: add site-specific components under `packages/website/components/<name>/`, register them in `components/index.tsx`, extend `components/section/section.schema.json`, add the schema to the `create-storyblok-config` list in `packages/website/package.json`, then run `update-storyblok-config` + `generate-content-types`.
6. **Seed content**: `pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter run init` (fresh spaces only).
7. **Cleanup for your fork**: the Storyblock-based `sync-preset-images`/`update-previews` flows and the MCP/editor packages are accelerator tooling, not site code; `docs/internal/` carries the upstream's own migration records.
