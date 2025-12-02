const cspHeader = `
    default-src 'self';
    connect-src 'self' localhost:3010 https://*.ruhmesmeile.com https://app.lemcal.com https://api.storyblok.com https://pzdzoelitkqizxopmwfg.supabase.co;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.ruhmesmeile.com https://app.storyblok.com https://cdn.lemcal.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    frame-src 'self' https://youtube.com https://www.youtube.com https://player.vimeo.com https://www.youtube-nocookie.com/ *.google.com;
    img-src 'self' blob: data: https://a.storyblok.com https://assets.lemcal.com https://videos.lemcal.com https://app.lemcal.com;
    media-src 'self' blob: data: https://a.storyblok.com;
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
    "@kickstartds/ds-agency-premium",
  ],
  output: "standalone",
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
        has: [{ type: "header", key: "host", value: "ruhmesmeile.com" }],
        destination: "https://www.ruhmesmeile.com/:path*",
        permanent: true,
      },
    ];
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
