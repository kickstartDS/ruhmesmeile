# Build stage — build design system + Storybook static site
FROM node:24-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.30.3 --activate

WORKDIR /app

# Copy workspace config files first for layer caching
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc package.json ./
# Copy pnpm patches so they are applied during install
COPY patches/ ./patches/
# Copy package.json for the design-system package
COPY packages/design-system/package.json ./packages/design-system/

# Install dependencies (--ignore-scripts prevents prepublishOnly from firing
# before source/tsconfig files are copied into the image)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Cache-bust: everything below here rebuilds when source changes.
# Pass --build-arg CACHEBUST=$(date +%s) to force a fresh build.
ARG CACHEBUST=0

# Storyblok Preview API token — injected at build time by Vite `define`
# so the theme switcher can fetch CMS themes from the CDN API.
ARG STORYBLOK_API_TOKEN
ENV STORYBLOK_API_TOKEN=${STORYBLOK_API_TOKEN}

# Copy source code
COPY packages/design-system/ ./packages/design-system/

# Build Storybook (tokens → schema → token extraction → search index → storybook build)
RUN cd packages/design-system && pnpm run build-storybook

# Serve stage — node, so `/mcp` can be a real endpoint rather than an SPA fallback.
#
# The Storybook config registers `@storybook/addon-mcp`, but that addon hooks the
# dev server only, so a `storybook build` never mounts it. `server/mcp-server.mjs`
# imports the addon's own dependency (`@storybook/mcp`) directly and serves the
# documentation toolset from the manifests this build already emits. It replaces
# nginx rather than sitting behind it: one process, no sidecar, and the static
# behaviour (SPA fallback, immutable caching, gzip) is reproduced there.
FROM node:24-alpine AS production

LABEL org.opencontainers.image.source="https://github.com/kickstartDS/ruhmesmeile-storyblok-starter"
LABEL org.opencontainers.image.description="kickstartDS Design System Storybook"

WORKDIR /app

# Pinned to the version the design system's lockfile resolves for this package.
RUN npm install --omit=dev --no-save @storybook/mcp@0.2.1

COPY packages/design-system/server/mcp-server.mjs ./

# Copy Storybook static output
COPY --from=builder /app/packages/design-system/storybook-static ./storybook-static

ENV PORT=8080 \
    STORYBOOK_STATIC_DIR=/app/storybook-static

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "mcp-server.mjs"]
