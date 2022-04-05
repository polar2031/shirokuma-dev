// DO NOT put any private variable here
const SiteConfig = {
  Variable: {
    // nav
    title: "Shirokuma.dev",
    // footer
    copyright: "© 2022 Shirokuma.dev",
    poweredBy: [{ name: "Next.js", url: "https://nextjs.org/" }],
    // cms
    apiUrl: "https://www.shirokuma.dev/strapi",
  },
  // check https://github.com/garmeeh/next-seo for more information
  // this part is equivalent to content in next-seo.config
  SEO: {
    title: "Shirokuma.dev",
    canonical: "https://Shirokuma.dev",
    openGraph: {
      type: "website",
      title: "Shirokuma.dev",
      url: "https://Shirokuma.dev",
      site_name: "Shirokuma.dev",
      images: [
        {
          url: "https://www.shirokuma.dev/strapi/uploads/temp_og_e4f7346e03.jpg",
          alt: "Shirokuma.dev",
        },
      ],
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image",
    },
  },
};

module.exports = SiteConfig;
