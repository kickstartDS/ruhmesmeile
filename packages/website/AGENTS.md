# AGENTS.md — packages/website

Next.js **13.5.6** (pages router) + React **19.2** Storyblok site. Package `@kickstartds/ruhmesmeile-storyblok-starter`, excluded from changesets (not published). **This is ruhmesmeile.com's production app** — see [../../AGENTS.md](../../AGENTS.md) for the deploy targets and the frozen `legacy.ruhmesmeile.com` reference snapshot; read it first for repo-wide invariants.

## Layout

- `pages/[[...slug]].tsx` — catch-all Storyblok page (ISR, `getStaticPaths` fallback `blocking`, `data-pagefind-body` for Pagefind).
- `pages/_preview/[[...slug]].tsx` — draft-only twin rendered inside the Visual Editor.
- `pages/_app.tsx` — provider stack (`SettingsContext → LanguageProvider → BlurHashProvider → DsaProviders → ComponentProviders → ImageSize/RatioProviders`), header/footer/breadcrumb shell, theme CSS injection.
- `pages/api/` — `preview`/`exit-preview` (draft mode, `_storyblok_tk` SHA1 check), `up` (health `"Ok"`), `server-sitemap.xml`, `markdown/[...slug]` (fetch own HTML → turndown), `sharepoint/token` (Azure client-credentials proxy), `prompter/*`.
- `middleware.ts` — rewrites `*.md` paths and `Accept: text/markdown` to `/api/markdown/<slug>`.
- `helpers/` — `storyblok.ts` (`initStoryblok`, `fetchStory/fetchStories/fetchPaths/fetchPageProps`, `storyProcessing` for assets/links/relations/number coercion, `resolveSharePointFolders`, `coerceNumberFields`), `unflatten.ts`, `fonts.ts` (**Metropolis**, see below), `sharepoint.ts`, `apiUtils.ts`.
- `components/` — `index.tsx` registry + `editable()` HOC; `ComponentProviders.tsx` overrides `Picture` (unpic + blurhash), `Link`, the footer, and per-component contexts; `footer/FooterComponent.tsx` (hardcoded site footer, see below); page components (`Page.tsx`, `BlogPost.tsx`, `BlogOverview.tsx`, `EventDetail.tsx`, `EventList.tsx`, `Search.tsx`, `SettingsPreview.tsx`, `TokenThemePreview.tsx`); and the site's own components, client scripts and stylesheets in `components/<name>/` — see [Styles](#styles).
- `index.scss` — this package's own global stylesheet, and now only that: the nav CTAs the design system has no slot for (`header/nav-header-cta.scss`, `nav-main/flyout/nav-flyout.scss`, `nav-main/topbar/nav-topbar.scss`), the `[data-ai-draft]` section marker, and the two components that live in this package (`info-table`, `book-a-demo`). The pre-migration brand layer it used to carry is the design system's again.
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

`build` touches Storyblok twice: `sync-default-theme` upserts the default theme **only when it differs** from what the design system compiles, and `blurhashes` refreshes the committed blurhash cache. Both need `NEXT_STORYBLOK_OAUTH_TOKEN`. To build without touching the CMS, prefix the command: `NEXT_STORYBLOK_OAUTH_TOKEN= …` — `dotenvx` never overrides an already-set variable, so the scripts see an empty token and take their documented skip path.

Keep that "only when it differs" property: with a Storyblok *publish* webhook wired to CI, an unconditional republish turns every deploy into a burst of no-op pipelines. Two details make it work — the stories list endpoint returns metadata only (fetch the story by id to see its `content`), and `tokens` comes back as a string, so compare it structurally rather than with `===`.

A **rejected** token is treated like a missing one: `sync-default-theme` warns and exits 0 on 401/403 (the theme story is `system: true` and keeps its content), and `createBlurHashes.js` already catches per-image failures. Both CMS scripts also **skip when the token or space id is absent** (`blurhashes` keeps the committed cache) — neither can block a deploy, and `pnpm -r run build` gets as far as `next build`, which is the one step that genuinely needs `NEXT_STORYBLOK_API_TOKEN` to enumerate the page list.

## Runtime: the website runs on Node 18, the tooling on Node 24

`packages/website/Dockerfile` builds and serves on **`node:18-alpine`**, and that is the version the site actually ships with. Next.js 13.5.6 is not compatible with Node 24 everywhere it matters: `res.setPreviewData()` — the draft-mode half of `/api/preview/` — throws `TypeError: Cannot read properties of undefined (reading 'prototype')` from Next's bundled `jsonwebtoken`. Under Node 18 the same route returns 200 and redirects to `/_preview/<slug>` with the draft cookies set (verified on the deployed site and locally).

So: run `next dev` for this package on Node 18 when you need the Visual Editor preview (`BUILD_ENV=preview` is part of the `dev` script). The monorepo tooling around it — pnpm 10.30.3, the design-system build, the CMS/schema scripts — needs Node 24 per the root `.nvmrc`.

## Site behaviour

- **Single language, German.** `locale = "de"` in `components/index.tsx`; `SUPPORTED_LANGS` is `["de"]` in both `pages/_app.tsx` and `components/ComponentProviders.tsx`, and the language switcher renders only when that array has more than one entry, so nothing shows. `getAltPath`/`hrefLang` in `components/Meta.tsx` stay as they are: with no alternates only the `de` alternate is emitted.
- **`robots.txt` allows crawling.** The starter ships `transformRobotsTxt` returning `User-agent: * / Disallow: /` (a staging default). `next-sitemap.config.js` restores the pre-migration policy — `Allow: /`, the `Host:` line and both sitemap URLs, all built from `NEXT_PUBLIC_SITE_URL`. Remember it is only regenerated by `postbuild`, i.e. by `build`.
- **Navigation carries a hardcoded CTA.** `components/nav-main/topbar/NavTopbarComponent.tsx` and `flyout/NavFlyoutComponent.tsx` are site overrides of the design system's nav components: they restore the "Projektanfrage" button (the DS topbar and flyout have no CTA slot) and the flyout logo (the DS `nav-flyout` still declares `logo` but ignores it). The flyout's sub-list guard is also a real ternary — the DS version renders a literal `0` into items whose `items` is an empty array. Styling for the appended CTA lives in this package (`nav-topbar.scss` / `nav-flyout.scss`); the nav's own typography, drawer geometry and breakpoints are the design system's again.
- **Footer is not CMS-driven.** `components/footer/FooterComponent.tsx` hardcodes the address, phone, mail and LinkedIn link and is registered through `FooterProvider` inside `LinkProvider` in `ComponentProviders.tsx` — that is what `_app.tsx`'s `<Footer />` resolves via `FooterContext`. The `navGroups` the CMS still carries for the footer are irrelevant to the rendered page; `migrateFooterNav.ts` only exists for content parity.
- **Legacy redirects live in `next.config.js`.** 19 `permanent: true` entries carry the pre-migration URLs (`/blog`, `/projekte`, `/kontakt`, …) to their current pages. `netlify.toml` still ships the original 20-entry list and is **inert** — the domain is served by Kamal, not Netlify, so a redirect added there does nothing. `/ueber-uns` was deliberately dropped from the list because it is a live page today; the one destination the old list got wrong (`…/uebersicht-ueber-unsere-design-system-services` pointed at a 404) now points at `/design-system-services`.
- **Host split is unchanged:** `ruhmesmeile.com` 308s to `www.ruhmesmeile.com` through the `host`-header rule in `next.config.js`.

### Fonts

Two webfonts are loaded. **Metropolis** is the display family, from `packages/design-system/dist/static/fonts/Metropolis-{Light,Regular,Medium,SemiBold,Bold}.woff2` at weights 300/400/500/600/700. The five `.woff2` files are committed as ordinary blobs (`.gitattributes` only LFS-tracks images/video under `packages/design-system/static/`), and the design-system build must run before the website build — which is the Dockerfile's order.

`helpers/fonts.ts` exports exactly four names, and `_app.tsx`, `_document.tsx`, `[[...slug]].tsx` and `_preview/[[...slug]].tsx` import all of them; changing a name breaks the build in four places. `localFontFamilyName = "Metropolis"` is matched against the *first* family in the CMS theme CSS by `_app.tsx`, which rewrites that value to next/font's synthetic name (`__displayFont_…`) so the browser uses the declared `@font-face`.

**Mulish is the copy and interface family** (300/400/600/800) and `token/dictionary/typo.json` names it in `font-family-copy`/`-interface`. Both halves are the design system's now: the faces are declared in `packages/design-system/src/_fonts.scss` (served from `packages/design-system/dist/static/fonts/Mulish-*.woff2` — the same byte-identical files the legacy deployment serves), and the family is set in the brand layer, `branding-tokens.json` → `--ks-brand-font-family-copy`/`-interface`. The site's own `fonts.scss` that used to declare them is gone with the rest of the pre-migration layer; `token/fonts/` still holds unreferenced copies (including the `novelpro-regular.woff` / `novelsanspro-*.woff` pair no token ever named). Until the post-migration review neither half was true: the dictionary pointed both at a `system-ui` stack and no sans face was loaded at all, so every non-display string — buttons, body copy, interface text — rendered in the platform UI font. That is why button labels read heavier than the pre-migration site: the old `600` was Mulish's. `syncDefaultTheme.ts` generates the CMS theme story from the design system's own `branding-tokens.json`, so the injected theme CSS and `global.css` name the same family.

`_document.tsx` emits a Google Fonts `<link>` only for a theme family that is a single, non-generic name; `googleFontUrl()` plus the `SYSTEM_FAMILIES` deny-list own that decision. Hyphens are part of the matched name, so `system-ui` is read whole instead of truncating to `system` and requesting a bogus stylesheet.

### Styles

The design system owns the brand layer; this package owns its own components. The pre-migration overrides used to live here — they were ported into `components/<name>/` first, into this package rather than into the vendored design system, because `_app.tsx` imports `@kickstartds/design-system/global.css` *before* `@/index.scss`, so website rules won the cascade. That layer has since been absorbed by the design system, so the values it carried now ship with it and the remaining site stylesheets carry only what is genuinely site-only.

**In the design system** (reached through `@kickstartds/design-system/global.css` and the per-component imports):

- `src/_global-token.scss` — the `:root` token layer: link weight/underline, logo heights, topic weight, content spacing and the pre-migration content widths, the footer byline/links tokens, the subheadline fonts the cta reads, and the globals the redesign stopped emitting (`--ks-depth-modal`, `--g-header-height`, `--g-scroll-offset`) together with `--dsa-border-radius-image`, `--dsa-rich-text--vertical-spacing` and `--dsa-text_highlight--font`.
- `src/token/*.scss` — scales and geometry: the legacy type scale (`font-size-token.scss`) and its 1.15/1.5 line heights (`font-token.scss`), the legacy spacing scale (`spacing-token.scss`), the flat 6px radii and the 2px emphasized border (`border-token.scss`), the `accent`/`bold` derivations (`background-color-token.scss`), and the `secondary` family — the tenth colour pair with its own ramp — in `color-token.scss` plus its `-bg`/`-border`/`-text` alias families in the matching files.
- `src/token/branding-tokens.json` (+ the generated `branding-tokens.css`) — `color.secondary` and the Mulish `copy`/`interface` families.
- `src/components/**` — the pre-migration component rules: button, cta, teaser-card, blog-aside, testimonials, stats, logos, breadcrumb, header, nav-main / nav-dropdown / nav-toggle / nav-flyout / nav-topbar, footer, section, headline, hero, image-text, image-story, contact, faq, features.
- `src/_fonts.scss` — every `@font-face`, Mulish included (see [Fonts](#fonts)).

**In this package** (`index.scss`, plus `components/prompter/prompter.scss`, which `_app.tsx` imports next to it):

- `components/header/nav-header-cta.scss` — the hand-built header anchor (`a.dsa-nav-main__header-cta`) and the language switcher; the design system's nav has neither.
- `components/nav-main/topbar/nav-topbar.scss` / `components/nav-main/flyout/nav-flyout.scss` — only the CTA rules. The site appends its own "Projektanfrage" button, which the design system's topbar and flyout have no slot for; the labels, drawer geometry and breakpoints are the design system's.
- `components/section/section.scss` — only `.dsa-section[data-ai-draft]`, emitted by `SectionProvider.tsx` and painted with `--prompter-color` from the prompter layer.
- `components/info-table/**` and `components/book-a-demo/**` — components that live in this package, styles included.
- `components/prompter/**` — the prompter UI.
- Three variables this package's own SCSS reads are undefined in both the old and the new build — `--ks-background-color-default-interactive`, `-hover` and `--ks-text-color-on-secondary`, all in `book-a-demo-tokens.scss`. That is faithful, not broken: the pre-migration bundle did not define them either, and the declarations were already inert. Everything else resolves.

### Legacy compatibility layers

This is the index of the pre-migration brand layer: the values the design system's redesign changed out from under this site's existing content and look, which the site used to restore by hand. It lived in this package (`global-token.scss` plus the `components/**` overrides); the design system has since absorbed it, each block still commented at its source. The table stays because the reasoning is *why* these values differ from upstream:

| What | Why it differs from upstream | Where it lives now |
| --- | --- | --- |
| `secondary` colour family | The pre-migration brand's tenth family (`#FF5C00`) had no slot in the redesign's nine-pair model, and the component rules that consume `--ks-color-secondary` had to keep working. It is a modelled tenth pair again. | `src/token/color-token.scss` (the family) plus its `-bg` / `-border` / `-text` alias families in `src/token/{background,border,text}-color-token.scss`; the pair and its own ramp in `src/token/branding-tokens.json` |
| `--dsa-content--spacing` | Dropped by the redesign; the footer and the section gutter still pad with it. | `src/_global-token.scss` (`src/components/section/_section-tokens.scss` for the gutter) |
| **Legacy type scale** | Rebuilt upstream around per-step growth and breakpoint factors, ~20 % smaller (h2: 39.99px vs 51.2px). Restores the legacy step bases, one factor per family per breakpoint, and the 1.15/1.5 line heights. | `src/token/font-size-token.scss` (`src/token/font-token.scss` for the line heights) |
| **Legacy spacing scale** | Same story: a medium gap measured 23.7px against 29.3px. Restores the legacy step bases and factors; the `stack`/`inline`/`inset` aliases follow automatically. | `src/token/spacing-token.scss` |
| **`accent` / `bold` backgrounds** | Derived from different palette steps, and `bold` came out mid-grey instead of the primary teal when inverted — the colour every section glow blends into. Inverted values now match exactly; light ones land ~2.4 % short (documented in the block). | `src/token/background-color-token.scss` |
| **Section gradients + transitions** | See below. | `src/components/section/_section-tokens.scss` (gradients) + `section.scss` (the class names the component emits) |
| **Pre-migration geometry** | Radii are derived from a brand factor × the spacing scale now; the old brand used flat literals. Measured at desktop: a teaser card came out 21.97px against 6px, a button 10.99px against 6px, the cta box 32.96px against 0 — and `--dsa-border-radius-image` (cta and image-text images) resolves through the same token. Restoring `--ks-border-radius-{card,control,surface}` takes all of them back at once. Also restores `--ks-border-width-emphasized`: `--ks-brand-border-width-emphasized` is never emitted, so every 2px border had silently collapsed to 1px. | `src/token/border-token.scss` |
| **Content widths** | `--dsa-content--width_wide` (`× 64` → `× 72`), `--dsa-tile--width_largest` (`× 38` → `× 42`) and the section gutter moving from `--dsa-content--spacing` to the narrower `--dsa-content--horizontal-spacing` — three separate widenings that together read as "sections are wider now". | `src/_global-token.scss` (widths) + `src/components/section/_section-tokens.scss` (gutter) |
| **Header** | The redesign made it an inset, blurred bar: `--dsa-header--max-width` shrank to the wide content width, `backdrop-filter: blur(20px)` was added, and the top-to-bottom `linear-gradient(var(--ks-color-bg), transparent)` was replaced by an opaque overlay colour. Both halves are the design system's again — the tokens, and the full-bleed geometry with its square corners that the "glass pill" wrapper and its 32.96px radius had replaced. | `src/components/header/_header-tokens.scss` (tokens) + `header.scss` (geometry) |
| **Teaser card + cta** | The card label was inverted (white background, primary text, primary border) against white-on-primary with no border; the image gained the card padding and a radius of its own, where it used to sit flush and be clipped by the card; `--dsa-teaser-card--border-width` was dropped outright. The cta box gained a surface radius where it had none. | `src/components/teaser-card/_teaser-card-tokens.scss` + `teaser-card.scss`; `src/components/cta/_cta-tokens.scss` |
| **Links, footer** | `--dsa-link--font-weight` dropped semi-bold → medium. Footer byline font, logo height, vertical gap and link gap changed with the redesign. Footer links re-inherit their weight on purpose: the old declaration passed a font *shorthand* into `font-weight`, which browsers dropped, so footer links never picked up the link weight. | `src/_global-token.scss` (link weight, byline, links gap) + `src/components/footer/_footer-tokens.scss` |
| **Tokens the stylesheet still reads but nothing defines** | Ten derived tokens were renamed or dropped while their consumers survived the migration. An undefined custom property makes the whole declaration invalid, so each of these rules is silently dead, not falling back: `--ks-color-fg-alpha-6-base` (the primary button's `inset 0 -3px 0` 3d edge — the flat button), `--ks-color-primary-alpha-{3,4,7}-base` (section glows, gradient and transition backgrounds), `--ks-color-transparent` (feeds every `--ks-border-color-*-clear-*`), `--g-header-height` (`calc(100vh - …)`), `--g-scroll-offset` (anchor `scroll-margin-top`), `--ks-depth-modal` (header and lightbox z-index), `--ks-color-fg-alpha-2-base` (open flyout backdrop). Nine of them are re-emitted; the tenth, `--ks-font-size-display-bp-factor-phone`, is deliberately gone — its only reader was the redesign's own breakpoint pass-through, which the restored type scale replaced. | `src/token/color-token.scss` (the alpha steps, `--ks-color-transparent`) + `src/_global-token.scss` (`--ks-depth-modal`, `--g-header-height`, `--g-scroll-offset`) |
| **Mulish** | See [Fonts](#fonts) — the sans family was never loaded, so the whole non-display typeface was the platform UI font. | `src/_fonts.scss` (the faces) + `src/token/branding-tokens.json` (the family) |
| **Storytelling subheadlines** | The redesign dropped `.dsa-cta.c-storytelling .c-storytelling__box .dsa-headline__subheadline { font: var(--dsa-cta__subheadline--font, …) }`, so the level's `em` size won instead of the cta's font: a homepage hero subheadline rendered 33.28px where the pre-migration site had 23.805px, a section cta 28.57px where it had 20.7px. The rule is back (plus the `highlight-text` variant, which is the hero), as are the per-level `--dsa-headline_<level>__subheadline--font` tokens it reads. The dropped base rule also supplied the *line-height* outside ctas (1.5, against the DS's 1.15), so it is restored there too, at the DS's old specificity so the `em` sizes still win for the size. All five homepage subheadlines now measure pixel-identical to legacy. | `src/components/cta/cta.scss` + `src/_global-token.scss` (the per-level fonts); the base rule in `src/components/headline/headline.scss` |
| **Cta box geometry** | Three separate deltas in the same box: the padding rule was dropped entirely (the hero's text column measured 700px against 603px, with no top offset); a new `--dsa-cta--gap` (a token the old bundle never had) subtracted another ~19.5px; and the redesign zeroes only the *right* padding from an `@container` rule. Box, image and column widths now match legacy exactly (720/720/603). | `src/components/cta/cta.scss` + `_cta-tokens.scss` |
| **Cta box vertical alignment** | The legacy cta fed the content's `image_align` field into the box's `vAlign`, producing `.c-storytelling__box--bottom`; the component only passed the DS' own `align` prop, so the class (and with it the box's bottom alignment) never rendered. | `src/components/cta/CtaComponent.tsx` |
| **Nav active weight** | The site's own desktop-nav typography override carried a `font:` shorthand that reset `font-weight`, silently clobbering the design system's bold-active rule at equal specificity. The active entry measured 400 where legacy had 700. | `src/components/nav-topbar/nav-topbar.scss` + `_nav-topbar-tokens.scss` |
| **Teaser hover shadow** | The redesign re-authored `--ks-box-shadow-card-hover` as a composition of brand blur/spread/opacity factors, which is what made the hover "way more dramatic". The legacy literal is restored scoped to the card (`.dsa-teaser-card`), so the DS chain and its inversion handling stay intact. | `src/components/teaser-card/_teaser-card-tokens.scss` |
| **Feature CTAs** | Feature bloks carry flat `cta_*` fields; the pre-migration site let those win over the container's `ctas` group, and the vendored design system maps every feature to the container instead — so feature links rendered as inline, icon-less anchors (and the icon the user asked for never appeared). The wrapper re-applies the legacy precedence, per field, with the container as fallback. The same pass restored `--dsa-feature__title--font` (interface-m, 18px, against the redesign's copy-m 20.25px), `besideLarge` → the large variant (2.2.1 had remapped it to medium), the legacy icon sizes/gaps, and switched the copy element back from `<p>` to a `<div>` (Markdown emits a `<p>` for copy with a trailing newline, and nested `<p>` is invalid). | `components/features/FeaturesComponent.tsx` (still here — it is this package's own wrapper) + `src/components/features/**` for the tokens and icon sizes |
| **Subheadline weight** | The pre-migration bundle carried a `font-weight` declaration on `.dsa-cta.c-storytelling .c-storytelling__box .dsa-headline__subheadline` that the redesign dropped. The `font:` shorthand restoring the cta subheadline (above) implies `normal`, and it comes after the token declarations, so every cta subheadline fell to 400 against the legacy 700. The restored shorthand rules each repeat the legacy `font-weight: var(--dsa-headline__subheadline--font-weight, var(--ks-font-weight-bold))` — a `font-weight` longhand is required after any `font` shorthand. | `src/components/cta/cta.scss` |
| **Cta `padding` option** | The field was inert in *both* builds: the pre-migration stylesheet had no `--no-padding` rule at all, and the restored box padding used to outrank the redesign's. Now `padding` defaults to on (`CtaDefaults.ts` + `cta.schema.json`, matching how the pre-migration site rendered every cta) and the box rule carries `:not(.dsa-cta--no-padding)`, so unchecking the field genuinely removes the padding while the default stays as approved. | `src/components/cta/cta.scss` + `_cta-tokens.scss` |

Known remaining differences, measured against the legacy site and deliberately left:

- **The cta `width` field is inert, in both builds.** The live Storyblok `cta` component carries a `width` field (type `text`, no label), but it appears in neither the design system's schema nor either stylesheet, and no rule in the pre-migration or the current bundle consumes it — the design system's own control for that is `fullWidth` (a boolean, rendered through the storytelling `full` flag). It is a leftover in the space, not a regression; removing it is a CMS change, so it was left in place.
- **The CMS schema snapshots are behind the live space.** `scripts/pull-content-schema` / `create-storyblok-config` fail in a plain dev shell (the Storyblok CLI is authenticated for a different space, and `create` needs a complete `packages/design-system/dist`), so `types/components-schema.json` and the dereffed copies under `packages/storyblok-mcp/schemas/` still show some labels the space has moved on from. The `teaser-card` `button_hidden` label was corrected by hand in the snapshot and in the design system's schema (the latter mattered: the space already read "Hide Button?", and the next generation from the design system would have reverted it to "Display Button").

- **Derived alpha ramps.** The redesign computes the `fg`/`primary` alpha steps with `color-mix` instead of the old literal `rgba()` values, so they land 2–3 percentage points apart (e.g. the secondary button's inset 3d edge: `0.27` against the legacy `0.24`). Same class of difference as the documented `accent`/`bold` deviation. The context-independent `-base` steps the ported rules read are pinned to the legacy literals in `src/token/color-token.scss`.
- **Teaser image hover zoom.** The redesign animates card images to `scale(1.05)` on hover; the pre-migration card had no motion. `src/components/teaser-card/_teaser-card-tokens.scss` turns it off — it is one line to reinstate.
- **Hero image height.** The hero's image renders 619px tall on legacy and 601px now, which shifts the bottom-aligned box by ~18px; the image sizing comes from the design system's media handling, not from a token this site sets.

### Section backgrounds

Two separate changes here, both invisible-without-a-diff:

- The redesign moved the accent/bold background transitions out of `section.style` into the new `section.transition` field and trimmed `style` to `default`/`framed`/`deko`. `migrateContentFields.ts` moves the legacy values (`accentTransition` → `to_accent`, `boldTransition` → `to_bold`, 40 sections); the surviving `horizontalGradient`/`verticalGradient`/`symmetricGlow`/`anchorGlow`/`stagelights` values stay in the content and get their gradients from the design system's `src/components/section/section.scss`.
- The system renders the raw option value as the class and its `transition` values are snake_case (`to_accent`) while its stylesheet keys the gradients off kebab-case (`--transition-to-accent`) — so nothing matched and every transition rendered as `background-image: none`. The design system's `section.scss` re-declares the gradients against the class names the component actually emits, and the five decorative styles under their camelCase class names (`dsa-section-style--anchorGlow`); the gradients themselves are in its `_section-tokens.scss`.

### Client behaviours belong to the app

The design system *defines* components like `base.teaser`, `content.count-up` and `base.lightbox-image`; it never instantiates them. Something in the app has to import each one, which is what `components/**/*.client.js` is for (`bundle-static-assets` globs that path). The site has an entry per behaviour:

| File | Registers |
| --- | --- |
| `components/teaser/teaser.client.js` | `base.teaser` — makes a whole teaser card clickable, `teaser-card` and blog cards alike. Without it nothing in a `.c-teaser` is clickable. |
| `components/stats/stats.client.js` | `content.count-up` — the stats numbers |
| `components/image-text/image-text.client.js` | `base.lightbox-image` — full-screen image lightbox |

**When porting a component from the pre-migration tree, port its `.client.js` as well as its SCSS.** The migration that produced this branch ported only the styles, which is exactly how the clickable cards went missing. Behaviour registration is the one half of a component that stays in this package — the styles are the design system's.

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

One table entry is a **move** rather than a rename, because the field changed as well as the name: `section.style: accentTransition|boldTransition` becomes `section.transition: to_accent|to_bold` and `style` is retired to `default` (40 sections). The `transition` value is only written when that field is free, so re-running is a no-op. The other legacy `style` values stay in the content and get their gradients from the design system's `src/components/section/section.scss`.

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
