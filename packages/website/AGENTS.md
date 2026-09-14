# AGENTS.md — packages/website

Next.js **13.5.6** (pages router) + React **19.2** Storyblok site. Package `@kickstartds/ruhmesmeile-storyblok-starter`, excluded from changesets (not published). **This is ruhmesmeile.com's production app** — see [../../AGENTS.md](../../AGENTS.md) for the deploy targets and the frozen `legacy.ruhmesmeile.com` reference snapshot; read it first for repo-wide invariants.

## Layout

- `pages/[[...slug]].tsx` — catch-all Storyblok page (ISR, `getStaticPaths` fallback `blocking`, `data-pagefind-body` for Pagefind).
- `pages/_preview/[[...slug]].tsx` — draft-only twin rendered inside the Visual Editor.
- `pages/_app.tsx` — provider stack (`SettingsContext → LanguageProvider → BlurHashProvider → DsaProviders → ComponentProviders → ImageSize/RatioProviders`), header/footer/breadcrumb shell, theme CSS injection.
- `pages/api/` — `preview`/`exit-preview` (draft mode, `_storyblok_tk` SHA1 check), `up` (health `"Ok"`), `server-sitemap.xml`, `markdown/[...slug]` (fetch own HTML → turndown), `sharepoint/token` (Azure client-credentials proxy), `prompter/*`.
- `middleware.ts` — rewrites `*.md` paths and `Accept: text/markdown` to `/api/markdown/<slug>`.
- `helpers/` — `storyblok.ts` (`initStoryblok`, `fetchStory/fetchStories/fetchPaths/fetchPageProps`, `storyProcessing` for assets/links/relations/number coercion, `resolveSharePointFolders`, `coerceNumberFields`), `unflatten.ts`, `fonts.ts` (**Metropolis**, see below), `sharepoint.ts`, `apiUtils.ts`.
- `components/` — `index.tsx` registry + `editable()` HOC; `ComponentProviders.tsx` overrides `Picture` (unpic + blurhash), `Link`, the footer, and per-component contexts; `footer/FooterComponent.tsx` (hardcoded site footer, see below); page components (`Page.tsx`, `BlogPost.tsx`, `BlogOverview.tsx`, `EventDetail.tsx`, `EventList.tsx`, `Search.tsx`, `SettingsPreview.tsx`, `TokenThemePreview.tsx`); and the **ported pre-migration SCSS overrides** in `components/<name>/`.
- `index.scss` — global stylesheet. Imports `./global-token.scss` first, then the ported component overrides in pre-migration order, then the starter's own (`info-table`, `section`, `header`, `header/nav-header-cta`, `breadcrumb`, `book-a-demo`).
- `global-token.scss` — pre-migration `:root` level overrides plus the restored `secondary` colour family and `--dsa-content--spacing`.
- `cms/` — hand-maintained only `visibility/*.schema.json` and `language/*.schema.json`; everything else there is generated and gitignored.
- `token/` — legacy leftovers (`dictionary/`, `branding-token.json`, 5 preset CSS files). **Nothing here feeds rendered CSS any more**; the design system's `branding-tokens.json`/`global.css` is the brand source of truth (see [../design-system/AGENTS.md](../design-system/AGENTS.md)).
- `scripts/` — `prepareProject.js` (destructive init), `backupSpace.sh`, `migrateContentFields.ts`, `migrateFooterNav.ts`, `mergeStoryblokConfig.ts`, `seedCmsConfig.js`, `generatePresets.js`, `extractComponentToken.js`, `calculateCssProperties.js`, `createBlurHashes.js`, `syncDefaultTheme.ts`, `bundleStaticAssets.js`.

## Commands

```bash
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter dev          # Next :3000 + SSL proxy :3010 (mkcert)
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter build        # build-tokens → sync-default-theme → extract-tokens → blurhashes → bundle-static-assets → next build
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter create-storyblok-config   # regenerate CMS config from JSON schemas
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter update-storyblok-config   # regenerate → rename → pull → merge → push
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter generate-content-types    # pull schema + generate TS types
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter push-components | push-component
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter extract-tokens | build-tokens | sync-default-theme
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter backup-space           # snapshot stories/components/presets/datasources/languages → backup/<stamp>/
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter migrate-content-fields # field renames; dry run unless -- --apply
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter migrate-footer-nav     # footer navItems → navGroups; dry run unless -- --apply
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter init        # DESTRUCTIVE: wipes a fresh Storyblok space and seeds it
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter lint         # next lint
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter env      # plop → .env.local
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter netrc    # plop → ~/.netrc
```

`postbuild` runs `next-sitemap` + `pagefind`. There is no `typecheck`/`test` script in this package — use `npx tsc --noEmit -p packages/website/tsconfig.json`.

`build` writes to Storyblok once (`sync-default-theme` upserts the default theme) and reads once (`blurhashes` refreshes the committed blurhash cache); both need `NEXT_STORYBLOK_OAUTH_TOKEN`. To build without touching the CMS, prefix the command: `NEXT_STORYBLOK_OAUTH_TOKEN= …` — `dotenvx` never overrides an already-set variable, so the scripts see an empty token and take their documented skip path.

A **rejected** token is treated like a missing one: `sync-default-theme` warns and exits 0 on 401/403 (the theme story is `system: true` and keeps its content), and `createBlurHashes.js` already catches per-image failures. Both CMS scripts also **skip when the token or space id is absent** (`blurhashes` keeps the committed cache) — neither can block a deploy, and `pnpm -r run build` gets as far as `next build`, which is the one step that genuinely needs `NEXT_STORYBLOK_API_TOKEN` to enumerate the page list.

## Runtime: the website runs on Node 18, the tooling on Node 24

`packages/website/Dockerfile` builds and serves on **`node:18-alpine`**, and that is the version the site actually ships with. Next.js 13.5.6 is not compatible with Node 24 everywhere it matters: `res.setPreviewData()` — the draft-mode half of `/api/preview/` — throws `TypeError: Cannot read properties of undefined (reading 'prototype')` from Next's bundled `jsonwebtoken`. Under Node 18 the same route returns 200 and redirects to `/_preview/<slug>` with the draft cookies set (verified on the deployed site and locally).

So: run `next dev` for this package on Node 18 when you need the Visual Editor preview (`BUILD_ENV=preview` is part of the `dev` script). The monorepo tooling around it — pnpm 10.30.3, the design-system build, the CMS/schema scripts — needs Node 24 per the root `.nvmrc`.

## Site behaviour

- **Single language, German.** `locale = "de"` in `components/index.tsx`; `SUPPORTED_LANGS` is `["de"]` in both `pages/_app.tsx` and `components/ComponentProviders.tsx`, and the language switcher renders only when that array has more than one entry, so nothing shows. `getAltPath`/`hrefLang` in `components/Meta.tsx` stay as they are: with no alternates only the `de` alternate is emitted.
- **`robots.txt` allows crawling.** The starter ships `transformRobotsTxt` returning `User-agent: * / Disallow: /` (a staging default). `next-sitemap.config.js` restores the pre-migration policy — `Allow: /`, the `Host:` line and both sitemap URLs, all built from `NEXT_PUBLIC_SITE_URL`. Remember it is only regenerated by `postbuild`, i.e. by `build`.
- **Navigation carries a hardcoded CTA.** `components/nav-main/topbar/NavTopbarComponent.tsx` and `flyout/NavFlyoutComponent.tsx` are site overrides of the design system's nav components: they restore the "Projektanfrage" button (the DS topbar and flyout have no CTA slot) and the flyout logo (the DS `nav-flyout` still declares `logo` but ignores it). The flyout's sub-list guard is also a real ternary — the DS version renders a literal `0` into items whose `items` is an empty array. Styling lives in the ported `nav-topbar.scss` / `nav-flyout.scss`.
- **Footer is not CMS-driven.** `components/footer/FooterComponent.tsx` hardcodes the address, phone, mail and LinkedIn link and is registered through `FooterProvider` inside `LinkProvider` in `ComponentProviders.tsx` — that is what `_app.tsx`'s `<Footer />` resolves via `FooterContext`. The `navGroups` the CMS still carries for the footer are irrelevant to the rendered page; `migrateFooterNav.ts` only exists for content parity.
- **Legacy redirects live in `next.config.js`.** 19 `permanent: true` entries carry the pre-migration URLs (`/blog`, `/projekte`, `/kontakt`, …) to their current pages. `netlify.toml` still ships the original 20-entry list and is **inert** — the domain is served by Kamal, not Netlify, so a redirect added there does nothing. `/ueber-uns` was deliberately dropped from the list because it is a live page today; the one destination the old list got wrong (`…/uebersicht-ueber-unsere-design-system-services` pointed at a 404) now points at `/design-system-services`.
- **Host split is unchanged:** `ruhmesmeile.com` 308s to `www.ruhmesmeile.com` through the `host`-header rule in `next.config.js`.

### Fonts

Only one webfont is loaded: **Metropolis**, as the display family, from `packages/design-system/dist/static/fonts/Metropolis-{Light,Regular,Medium,SemiBold,Bold}.woff2` at weights 300/400/500/600/700. The five `.woff2` files are committed as ordinary blobs (`.gitattributes` only LFS-tracks images/video under `packages/design-system/static/`), and the design-system build must run before the website build — which is the Dockerfile's order.

`helpers/fonts.ts` exports exactly four names, and `_app.tsx`, `_document.tsx`, `[[...slug]].tsx` and `_preview/[[...slug]].tsx` import all of them; changing a name breaks the build in four places. `nextFontFamilies.copy`/`.interface` point at the display font because the copy and interface families are plain system stacks — nothing is loaded for them. `localFontFamilyName = "Metropolis"` is matched against the *first* family in the CMS theme CSS by `_app.tsx`, which rewrites that value to next/font's synthetic name (`__displayFont_…`) so the browser uses the declared `@font-face`.

`_document.tsx` emits a Google Fonts `<link>` only for a theme family that is a single, non-generic name; `googleFontUrl()` plus the `SYSTEM_FAMILIES` deny-list own that decision. Hyphens are part of the matched name, so `system-ui` is read whole instead of truncating to `system` and requesting a bogus stylesheet.

### SCSS overrides

The pre-migration site overrode most design-system components. They were ported into this package rather than into the vendored design system, because `_app.tsx` imports `@kickstartds/design-system/global.css` *before* `@/index.scss`, so website rules already win the cascade and the vendored design system stays mergeable against upstream.

- Components the starter already imported get the pre-migration rules **appended inside the existing file** (same component, one file, later rules win): `info-table`, `section`, `header`. `section` also gained `section-tokens.scss` plus the `@import` at the top of its file.
- Every other override is a copied `components/<name>/` directory wired through a `@use` line in `index.scss`: `button`, `blog-aside`, `cta`, `contact`, `faq`, `features`, `footer`, `headline`, `hero`, `image-text`, `image-story`, `nav-main` (with `nav-dropdown`, `nav-toggle`, `flyout/nav-flyout`, `topbar/nav-topbar`), `stats`, `teaser`, `testimonial`.
- The copied files keep their original `@import "./<name>-tokens.scss";` first lines (Dart Sass warns about `@import`; converting them is a separate cleanup).
- **`secondary` colour family.** The pre-migration brand had a tenth family (`#FF5C00`) that unified theming cannot express, so the design system no longer emits it. `global-token.scss` restores all 268 derived custom properties verbatim, split across the same three layers the old bundle used (`-base` defaults, non-inverted aliases, `[ks-inverted=true]` aliases). `--dsa-content--spacing`, also dropped by the redesign, is restored there too.
- Six variables the ported SCSS reads are undefined in both the old and the new build (`--ks-color-primary-interactive-hover`/`-active`, `--ks-font-weight-thin`, `--ks-background-color-default-interactive{,-hover}`, `--ks-text-color-on-secondary`). That is faithful, not broken: the pre-migration bundle did not define them either, and the declarations were already inert. Everything else resolves.

### Legacy compatibility layers

`global-token.scss` and `components/section/section.scss` carry everything the DS redesign changed out from under this site's existing content and look. Each block is commented at its source; this is the index:

| What | Why it is here |
| --- | --- |
| `secondary` colour family (268 declarations) | The tenth brand family has no slot in the nine-pair model; the ported component overrides still consume it. |
| `--dsa-content--spacing` | Dropped by the redesign; `footer.scss` still pads with it. |
| **Legacy type scale** | Rebuilt upstream around per-step growth and breakpoint factors, ~20 % smaller (h2: 39.99px vs 51.2px). Restores the legacy step bases, one factor per family per breakpoint, and the 1.15/1.5 line heights. |
| **Legacy spacing scale** | Same story: a medium gap measured 23.7px against 29.3px. Restores the legacy step bases and factors; the `stack`/`inline`/`inset` aliases follow automatically. |
| **`accent` / `bold` backgrounds** | Derived from different palette steps, and `bold` came out mid-grey instead of the primary teal when inverted — the colour every section glow blends into. Inverted values now match exactly; light ones land ~2.4 % short (documented in the block). |
| **Section gradients + transitions** | See below. |

### Section backgrounds

Two separate changes here, both invisible-without-a-diff:

- The redesign moved the accent/bold background transitions out of `section.style` into the new `section.transition` field and trimmed `style` to `default`/`framed`/`deko`. `migrateContentFields.ts` moves the legacy values (`accentTransition` → `to_accent`, `boldTransition` → `to_bold`, 40 sections); the surviving `horizontalGradient`/`verticalGradient`/`symmetricGlow`/`anchorGlow`/`stagelights` values stay in the content and get their gradients from `section.scss`.
- The system renders the raw option value as the class and its `transition` values are snake_case (`to_accent`) while its stylesheet keys the gradients off kebab-case (`--transition-to-accent`) — so nothing matched and every transition rendered as `background-image: none`. `section.scss` re-declares the gradients against the class names the component actually emits, and the five decorative styles under their camelCase class names (`dsa-section-style--anchorGlow`).

### Client behaviours belong to the app

The design system *defines* components like `base.teaser`, `content.count-up` and `base.lightbox-image`; it never instantiates them. Something in the app has to import each one, which is what `components/**/*.client.js` is for (`bundle-static-assets` globs that path). The site has an entry per behaviour:

| File | Registers |
| --- | --- |
| `components/teaser/teaser.client.js` | `base.teaser` — makes a whole teaser card clickable, `teaser-card` and blog cards alike. Without it nothing in a `.c-teaser` is clickable. |
| `components/stats/stats.client.js` | `content.count-up` — the stats numbers |
| `components/image-text/image-text.client.js` | `base.lightbox-image` — full-screen image lightbox |

**When porting a component from the pre-migration tree, port its `.client.js` as well as its SCSS.** The migration that produced this branch ported only the styles, which is exactly how the clickable cards went missing.

To find gaps: collect every `ks-component="…"` identifier from a rendered page and check each one is defined in `public/_/*.js` (`base.container`, `buttons` and `logo` are inert markers, not components).

### Client scripts

Behaviour goes in `<name>.client.js` — plain DOM, no framework — which `bundle-static-assets` bundles into `public/_/client.js`. **After adding or editing a client script, re-run `bundle-static-assets`** — `next dev` serves the previously built bundle, so the behaviour silently won't run locally until you do. `public/_/`, `public/client.js` and `public/blurhashes/` are the outputs; `blurhashes` is committed, the other two are generated.

Registering a component touches four places: the registry in `components/index.tsx` (`editable(...)` — pass the nested-bloks key only for container components), the `$ref` list in `components/section/section.schema.json`, the `--components` list in the `create-storyblok-config` script, then `update-storyblok-config` + `generate-props`.

## Content migrations (`scripts/`)

These three scripts exist because the migration to the monorepo renamed fields and moved layout options. All three read a Management API token from `.env.local` and are **dry-run by default**; `-- --apply` writes.

- `backupSpace.sh` (`backup-space`) snapshots stories, components, presets, datasources and languages into `backup/<stamp>/` (gitignored). Stories are pulled with the **official CLI** so `storyblok stories push --space "$NEXT_STORYBLOK_SPACE_ID" --path backup/<stamp>/stories --dry-run` can put them back — a hand-rolled JSON dump cannot. It exits non-zero if it wrote no stories. Expect a ~90 s `timeout` on the datasources step when the space has none (upstream CLI spinner bug, explained in the script). Requires a one-time `storyblok-login`.
- `migrateContentFields.ts` (`migrate-content-fields`) applies the `RENAMES` table below, drops the dead `type` discriminator inside bloks only, and *counts* — never modifies — the `MANUAL_REVIEW` fields. Published stories are re-published; drafts stay drafts. Idempotent, so re-running after a retarget is safe.
- `migrateFooterNav.ts` (`migrate-footer-nav`) turns the old flat `footer.navItems` list into `navGroups` columns (`heading` + `headingUrl`) and drops second-level links the old footer never rendered. Needs the new footer schema pushed first, or `headingUrl` lands in a field Storyblok does not have.

### Field renames applied to content

Stored content still uses the pre-migration names until `migrate-content-fields -- --apply` runs. **Write new content with the right-hand names.** Counts are bloks across all stories in space `297364`, as reported by the migration's own dry run.

| Component | was | now | bloks |
| --- | --- | --- | --- |
| `buttons` | `target` | `url` | 136 |
| `teaser-card` | `target` | `url` | 124 |
| `feature` | `cta_target` | `cta_url` | 135 |
| `links` | `href` | `url` | 17 |
| `socialSharing` | `href` | `url` | 15 |
| `navItems` | `href` | `url` | 11 |
| `blog-teaser` | `link_label` | `link_text` | 9 |
| `cta` | `contentAlign` | `image_align` | 125 |
| `footer` | `byline` | `copyright` | 2 |

(`items.href` → `url`, `tile.button_target` → `button_url` and `slider.typeProp` → `variant` are in the same table and match nothing in this space. `blog-author.byline` is a *different*, still valid field — the rename is component-scoped.)

One table entry is a **move** rather than a rename, because the field changed as well as the name: `section.style: accentTransition|boldTransition` becomes `section.transition: to_accent|to_bold` and `style` is retired to `default` (40 sections). The `transition` value is only written when that field is free, so re-running is a no-op. The other legacy `style` values stay in the content and get their gradients from `components/section/section.scss`.

Fields the redesign removed, which content still carries and the script only counts (`migrate-content-fields` prints the live numbers): `cta.width` (88 bloks, 28 carrying a value), `feature.style` (141 / 135), `feature.cta_style` (141 / 135), `feature.cta_toggle` (135 / 37), `cta.fullWidth` (125 / 72), `buttons.icon` (136 / 109). `feature.icon` still exists and still renders, so it is not in that list.

**Which of those actually change the page** was decided by reading the *rendered* legacy HTML, not the schema:

- `feature.style`, `feature.cta_style`, `feature.cta_toggle` and `cta.width` are inert. The legacy `.dsa-feature--*` classes were produced by the **`features` container** (`style`, `layout`, `ctas_style`, `ctas_toggle`) — values that survive unchanged into the merged schema, so those containers keep rendering as before. `cta.width` never emitted a class at all (the legacy `.dsa-cta--*` set is `align`, `full-width`, `color-neutral`, `highlight-text`). No CMS edits needed.
- `cta.fullWidth` was live (`dsa-cta--full-width`) and has no counterpart: the new `Cta` has no full-width prop. The nearest CMS levers are the *section's* `width: full` or the cta's `padding`.
- `buttons.icon` was live (an `<svg class="icon">` inside the button) and has no counterpart in the new button schema.

Both real losses are accepted redesign differences rather than special-cased in website code; re-adding a field nothing renders would only put content back into a dead key.

## Content compatibility after the migration

Validating every story against the dereferenced design-system schemas (a one-off `auditContentCompat.ts`, since deleted) reported **no structural errors** — nothing is missing a `component` discriminator, nothing carries both `component` and `type`, and no container holds the wrong child type. The remaining findings are all artefacts of the *rule source*, not content defects, and are worth knowing before trusting that validator again:

| Reported | Why it is not a defect |
| --- | --- |
| `Component "buttons" cannot be a direct child of "section.buttons"` (also `image-story.buttons`) | The live CMS schema whitelists exactly `["buttons"]` for those slots. The design system models the slot's children more narrowly than the CMS stores them. |
| `Unknown component "tags"` | `blog-teaser.tags` whitelists `["tags"]` in the CMS; `BlogTeaserContextDefault` maps `tags.map(tag => tag.entry)`. The DS schema models tags as an inline array, so the rule builder never sees a nested component. |
| `Unknown component "global_reference"` | A real site-level component (an internal-story reference picker) handled by `GlobalReference` in the registry. It is not in the design system schemas, and `section.components` has never whitelisted it — pre-existing editor-whitelist drift, unchanged by this migration. |

Site-level components the design system's schemas know nothing about: `global`, `global_reference`, `navSubItems`, `tiles` (plus the `tags`/`buttons`/`links`/`images` array wrappers). Anything that derives validation rules from `packages/design-system/dist/components` alone will flag them.

## Environment

`.env.local` (gitignored, required by `dotenvx`-wrapped scripts): `NEXT_STORYBLOK_API_TOKEN`, `NEXT_STORYBLOK_OAUTH_TOKEN`, `NEXT_STORYBLOK_SPACE_ID`, `NEXT_OPENAI_API_KEY`, `NEXT_PUBLIC_SITE_URL` (plus `KAMAL_REGISTRY_PASSWORD` for deploys).

Committed `.env` — this site's real values, no secrets: `NEXT_PUBLIC_PRIMARY_PUBLIC_SITE_DOMAIN=www.ruhmesmeile.com`, `NEXT_PUBLIC_SECONDARY_PUBLIC_SITE_DOMAIN=ruhmesmeile.com`, `NEXT_PUBLIC_SITE_URL=https://${NEXT_PUBLIC_PRIMARY_PUBLIC_SITE_DOMAIN}`, `NEXT_PUBLIC_ANALYTICS_DOMAIN=usage.ruhmesmeile.com`, `NEXT_PUBLIC_ANALYTICS_SITE_ID=6450847a-97a3-49ee-ab76-0b0ec4ee98e3`, `NEXT_PUBLIC_C15T_URL`, `DOCKER_SITE_IMAGE_NAME=ruhmesmeile/ruhmesmeile-website`, `HOSTING_SERVER_IP=91.98.115.152`.

Optional: `STORYBLOK_REGION` (default `eu`) and `AZURE_TENANT_ID`/`AZURE_CLIENT_ID`/`AZURE_CLIENT_SECRET` for the SharePoint token proxy.

## Gotchas

- **`dev` needs the generated artifacts.** `build` produces `token/{tokens.*,calculated.js,components.js,InlineIcon.tsx}` and `components/bundle-hash.ts`; `dev` does not. Run `build-tokens`, `extract-tokens`, `blurhashes`, `bundle-static-assets` (and `sync-default-theme` if you want the CMS theme story) once, otherwise the app fails to compile with `Can't resolve '@/token/calculated'`.
- **Build order matters for every CMS/schema script.** `create-storyblok-config`, `generate-props`, `dereference-schemas`, `create-defaults` and `update-storyblok-config` read the design system through `node_modules/@kickstartds/design-system/dist/components`. With pnpm's `injectWorkspacePackages: true`, that path only exists after `pnpm --filter @kickstartds/design-system build` **followed by `pnpm install`**. Skipping the re-install yields `Couldn't find a reffed json in json allOf graph generation`.
- **Storyblok layout for settings and themes:** the theme pipeline owns the folder `settings/` and writes `settings/themes/<slug>` stories (`syncDefaultTheme.ts`). A *story* with slug `settings` at the space root collides with that folder (`422 Slug settings already taken`), so the settings story lives inside it as `settings/settings`. `fetchPageProps` finds it purely by `content_type=settings`, so its slug does not matter — but the folder does.
- `next` lives in `devDependencies` while `react`/`react-dom` are runtime deps at v19 (Next 13 nominally targets React 18) — do not "fix" this casually; both the website and the design system build against it.
- `next.config.js` sets `output: standalone`, the CSP, `experimental.outputFileTracingRoot` at the monorepo root, the legacy redirects, and externalizes `jsdom`/`readability`/`turndown` server-side.
- `scripts/prepareProject.js` deletes live Storyblok content. Never run it against a populated space. It must be invoked as `pnpm --filter … run init` — the bare `pnpm … init` form hits pnpm's built-in `init`.
- Generated + gitignored: `cms/merged/`, `cms/*.generated.json`, `cms/merge-report.json`, `types/components.*.json`, `token/{tokens.*,components.js,calculated.js,InlineIcon.tsx,storybook/}`, `public/{sitemap*,robots.txt,pagefind,img/screenshots,_}`. Committed: `public/blurhashes/`.
- `update-storyblok-config` runs pull → merge → push against the **live** space; inspect `cms/merge-report.json` afterwards (see `docs/adr/adr-storyblok-config-merge.md`).
- `generate-content-types` pulls the live schema and overwrites the committed, LFS-tracked `types/components-schema.{json,d.ts}` and `types/components-presets.json` — commit the regenerated files after schema changes.
