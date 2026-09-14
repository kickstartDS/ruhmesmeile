# AGENTS.md — packages/design-system

`@kickstartds/design-system` v2.2.1, **published** (`files: ["dist"]`, `publishConfig.access: public`). The repo's component + token source of truth. Fork of the kickstartDS design system ("ds-agency-premium" renamed in the monorepo migration).

## Structure

- `src/components/<name>/` — 72 component directories (+ `cms/` with 6 page-type components: page, blog-post, blog-overview, event-list, event-detail, search).
- Per component: `{Name}Component.tsx` (pure, `forwardRef`, Context-overridable), `{Name}Component.scss` (BEM, tokens only), `{Name}Component.client.ts` (vanilla JS behavior), `<name>.schema.json` (**source of truth** for props), `_<name>-tokens.scss` (component tokens). Schema-only components exist (`tile`, `blog-tag`); style-only too (`rich-text`, `lightbox`).
- `src/token/dictionary/*.json` → Style Dictionary (`sd.config.cjs`) → `src/token/*-token.scss` + `tokens.js` + `storybook/`.
- `src/token/branding-tokens.json` (W3C DTCG) + 8 presets `branding-tokens-{blizzard,burgundy,coffee,ember,granit,mint,neon,water}.{json,css}` + `branding-tokens.schema.json`.
- `.storybook/{main.ts,preview.tsx,test-runner.tsx,themes.ts,ThemeTool.tsx}` — Storybook 10 (react-vite). Active addons: links, a11y, docs, mcp. HTML/playroom/component-tokens/design-token addons are commented out.
- `rollup.config.mjs` — bundles to `dist/components/<name>/{index.js,.schema.json,.d.ts}`, `dist/tokens/*`, `dist/static`.
- `playroom.config.js` — Playroom :9000, widths 425/768/1440, theme `dsa`.
- `__snapshots__/` (LFS) → `static/img/screenshots/` (LFS) → `dist/static`.

## Commands

```bash
pnpm --filter @kickstartds/design-system build     # rm -rf dist → build-tokens → schema → token → component-token-catalog → semantic-token-catalog → branding-tokens → rollup -c → token-graph → tsc --emitDeclarationOnly → generateDtsBarrels → presets
pnpm --filter @kickstartds/design-system storybook            # dev server :6006
pnpm --filter @kickstartds/design-system build-storybook      # build-tokens → schema → token → search (Pagefind) → copy-theme-css → storybook build
pnpm --filter @kickstartds/design-system test                 # rimraf __snapshots__ && run-p -r test:*  (needs storybook-static/)
pnpm --filter @kickstartds/design-system create-component-previews   # test capture → copy PNGs to static/img/screenshots
pnpm --filter @kickstartds/design-system presets              # vitest generatePresets.test.ts → snippets.json + components.ts
pnpm --filter @kickstartds/design-system playroom
pnpm --filter @kickstartds/design-system chromatic
pnpm --filter @kickstartds/design-system typecheck
```

`build-storybook` does **not** include `test`. `test` deletes `__snapshots__/` first, then serves `storybook-static/` on :6006 and runs `@storybook/test-runner` (Playwright, `jest-image-snapshot`, threshold 0.2%). Run `pnpm exec playwright install` once first.

## Conventions

- **JSON Schema is the prop contract.** Change `<name>.schema.json` first; TS types, defaults, and Storyblok config derive from it.
- Keep components pure: no React state, no hooks beyond refs/context; interactivity goes in `*.client.ts`.
- Styling uses tokens only: `--ks-brand-*` → `--ks-*` → `--dsa-*`. Never hardcode colors/spacing/fonts.
- Storybook stories drive everything downstream: presets, screenshots, Playroom inputs, and CMS previews. Adding/renaming a story requires `build-storybook` + `create-component-previews` and committing LFS PNGs in both `__snapshots__/` and `static/img/screenshots/`.
- Never hand-edit generated output: `dist/`, `src/types`, `src/token/token-graph.json`, `component-token-catalog.json`, `semantic-token-catalog.json`, `snippets.json`, `components.ts`, `static/pagefind`.

## Branding for this site

`src/token/branding-tokens.json` is **the authoritative brand layer for the rendered site** — `_app.tsx` imports `@kickstartds/design-system/global.css`, which is the only brand input that reaches the page. `packages/website/token/dictionary/**` and `packages/website/token/branding-token.json` are legacy leftovers consumed only by `scripts/extractComponentToken.js` and `sync-default-theme`; they no longer feed rendered CSS (see `docs/adr/adr-unified-theming.md`).

The file was translated from the pre-migration (`@kickstartds/ds-agency-premium@1.6.73`) brand. Two naming conventions matter when translating:

- `$root` is the value used in the **default (light)** context, `inverted` the one used under `[ks-inverted=true]`. In the old two-token model `X`/`X-inverted` meant the same thing, so the mapping is direct.
- The nine pairs are the whole palette. `onPrimary` is the text colour *on top of* a primary surface: white on the light primary (`#2C5D5D`), near-black on the inverted primary (`#FFFFFF`).

Values as migrated, all verified against the live pre-migration CSS:

| pair | `$root` | `inverted` |
| --- | --- | --- |
| `primary` | `#2C5D5D` | `#FFFFFF` |
| `onPrimary` | `#FFFFFF` | `#212327` |
| `bg` | `#FFFFFF` | `#212327` |
| `fg` | `#212327` | `#FFFFFF` |
| `link` | `#2C5D5D` | `#FFFFFF` |
| `positive` | `#6EDB64` | `#23831B` |
| `negative` | `#FF1A57` | `#D21D48` |
| `informative` | `#64C2DB` | `#00718F` |
| `notice` | `#F9DE55` | `#FF5D53` |

`fg.$root` is `#212327`, **not** the `#323437` in `packages/website/token/branding-token.json`: the legacy build took the default foreground from its `token/dictionary/color.json` (`ks.color.fg.base`), which overrode the branding token. Same story for `onPrimary`, which the old design system derived from the current context's foreground. `scale`, `font.weight`, `font.size`, `spacing`, `border`, `box-shadow` and `duration` are untouched from the starter.

**`secondary` has no slot.** The brand had a tenth family (`#FF5C00`, 270 derived custom properties including its own `bg`/`border`/`text` colour aliases) that the nine-pair model cannot express, so the design system no longer emits it. The site's own component overrides still consume `--ks-color-secondary` and `--ks-color-secondary-alpha-7-base`; they are restored verbatim in `packages/website/global-token.scss`. If a future DS update grows a tenth pair, move them there and delete the restoration.

After any edit to `branding-tokens.json`, run `pnpm --filter @kickstartds/design-system branding-tokens` — it schema-validates against `branding-tokens.schema.json` and writes the sibling `branding-tokens.css`. A validation error means a component is out of range (colors are 0–1 srgb floats), not that the mapping is wrong. `build` runs it as one of its steps.

## Gotchas

- Pinned upstream forks are patched via `/patches` (`@kickstartds/base`, `@kickstartds/jsonschema-utils`, `kickstartds@3.5.0--canary.62.324.0`, `storybook@10.2.15`, `storybook-addon-playroom`, `@glidejs/glide`). Bumping any of these requires renaming the patch file **and** the `pnpm.patchedDependencies` key in the root `package.json`.
- `typecheck` is expected to fail in this package: `tsc --noEmit` reports pre-existing errors (e.g. `Cannot find type definition file for 'minimatch'`) — see `docs/adr/adr-monorepo-integration.md`, ADR-011.
- `build-tokens` compiles only `src/token/dictionary`; the 8 branding presets come from the separate `branding-tokens` script.
- Storybook reads `STORYBLOK_API_TOKEN` to fetch CMS `token-theme` stories into the theme toolbar; without it, only local presets appear.
- Consumed by the website via `workspace:*` dist exports (`@kickstartds/design-system/<component>`, `tokens/tokensToCss.mjs`, `presets.json`, `static/`). Changing exports breaks the website, storyblok-mcp, design-tokens-editor, and the Docker builds that consume a host-prebuilt `dist/`.
