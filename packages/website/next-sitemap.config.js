/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  changefreq: "daily",
  priority: 0.7,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/server-sitemap.xml`,
    ],
    transformRobotsTxt: async () =>
      [
        "User-agent: *",
        "Allow: /",
        "",
        "# Host",
        `Host: ${process.env.NEXT_PUBLIC_SITE_URL}`,
        "",
        "# Sitemaps",
        `Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
        `Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/server-sitemap.xml`,
        "",
      ].join("\n"),
  },
  transform: async () => {
    return null;
  },
};
