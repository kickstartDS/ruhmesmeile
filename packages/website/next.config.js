const path = require("path");

const cspHeader = `
    default-src 'self';
    connect-src 'self' localhost:3010 https://api.storyblok.com https://*.ruhmesmeile.com https://app.lemcal.com https://pzdzoelitkqizxopmwfg.supabase.co;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.storyblok.com https://*.ruhmesmeile.com https://cdn.lemcal.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    frame-src 'self' https://youtube.com https://www.youtube.com https://player.vimeo.com https://www.youtube-nocookie.com/ *.google.com;
    img-src 'self' blob: data: https://a.storyblok.com https://placehold.co https://assets.lemcal.com https://videos.lemcal.com https://app.lemcal.com https://*.ruhmesmeile.com;
    media-src 'self' blob: data: https://a.storyblok.com https://placehold.co;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors https://app.storyblok.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@kickstartds/base",
    "@kickstartds/blog",
    "@kickstartds/content",
    "@kickstartds/core",
    "@kickstartds/form",
    "@kickstartds/design-system",
  ],
  output: "standalone",
  // Point to monorepo root so Next.js can trace dependencies hoisted by pnpm.
  // On Next.js 13 this option only exists under `experimental` (it was
  // promoted to a top-level, stable option in later Next.js major versions).
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  webpack: (config, { isServer }) => {
    // @glidejs/glide@3.7+ has a restrictive exports map that only exposes
    // "./dist/*", but @kickstartds/content imports from "./src/*".
    // Alias the subpath to the actual filesystem location to bypass exports.
    const glideDir = path.dirname(
      require.resolve("@glidejs/glide/dist/glide.esm.js")
    );
    config.resolve.alias["@glidejs/glide/src"] = path.join(glideDir, "../src");

    if (isServer) {
      // jsdom (used by storyblok-services/scrape) and its transitive deps
      // (undici@7, whatwg-url@16, html-encoding-sniffer@6, etc.) use
      // ESM-only sub-packages and modern syntax (private class fields)
      // that webpack in Next.js 13 cannot bundle or parse.
      // Externalize them so Node.js resolves them at runtime instead.
      const serverOnlyPackages = ["jsdom", "@mozilla/readability", "turndown"];
      config.externals.push(({ request }, callback) => {
        if (
          serverOnlyPackages.some(
            (pkg) => request === pkg || request.startsWith(pkg + "/")
          )
        ) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }

    return config;
  },
};

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "host",
            value: process.env.NEXT_PUBLIC_SECONDARY_PUBLIC_SITE_DOMAIN,
          },
        ],
        destination: `https://${process.env.NEXT_PUBLIC_PRIMARY_PUBLIC_SITE_DOMAIN}/:path*`,
        permanent: true,
      },
      // Legacy URLs carried over from the pre-migration site (authoritative
      // list lived in `netlify.toml`, which never applied under Kamal).
      // Every `source` 404s on the current site and every `destination`
      // resolves; `/ueber-uns` was dropped because that path is a live page.
      { source: "/brauche-ich-ein-design-system", destination: "/design-system-services/brauche-ich-ein-design-system", permanent: true },
      { source: "/headless-cms", destination: "/headless-cms/headless-cms-services", permanent: true },
      { source: "/internetagentur/partner", destination: "/ueber-uns/partner", permanent: true },
      { source: "/kontakt", destination: "/ueber-uns/kontakt", permanent: true },
      { source: "/leistungen/ux-strategie-und-beratung", destination: "/ux-strategie-beratung", permanent: true },
      { source: "/referenzen", destination: "/ueber-uns/referenzen", permanent: true },
      { source: "/vorteile-eines-design-systems", destination: "/design-system-services/vorteile-eines-design-systems", permanent: true },
      { source: "/was-sind-headless-cms", destination: "/headless-cms/was-ist-ein-headless-cms", permanent: true },
      { source: "/web-frontends/design-system-implementierung", destination: "/design-system-services/design-system-implementierung", permanent: true },
      { source: "/web-frontends/design-system-implementierung/storybook", destination: "/glossar/storybook", permanent: true },
      { source: "/web-frontends/frontend-architektur/atomic-design", destination: "/glossar/atomic-design", permanent: true },
      { source: "/design-system-services/uebersicht-ueber-unsere-design-system-services", destination: "/design-system-services", permanent: true },
      { source: "/design-system-services/mehrwerte-von-kickstartds", destination: "/design-system-services/design-system-starterkit-kickstartds", permanent: true },
      { source: "/services/digitales-marketing/typo3", destination: "/ueber-uns/kontakt", permanent: true },
      { source: "/cms-starter-paket", destination: "/headless-cms/cms-website-accelerator", permanent: true },
      { source: "/headless-cms/cms-starter-paket", destination: "/headless-cms/cms-website-accelerator", permanent: true },
      { source: "/projekte", destination: "/case-studies", permanent: true },
      { source: "/insights", destination: "/design-system-insights", permanent: true },
      { source: "/blog", destination: "/design-system-insights", permanent: true },
    ];
  },
  images: {
    domains: ["a.storyblok.com", "placehold.co"].filter(Boolean),
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/c15t/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
  //     },
  //   ];
  // },
  ...nextConfig,
};
