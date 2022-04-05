// DO NOT put any private variable here
const SiteConfig = {
  Variable: {
    // nav
    title: "Your Awesome Site",
    // footer
    copyright: "© 2022 YourName",
    poweredBy: [{ name: "Next.js", url: "https://nextjs.org/" }],
    siteUrl: "http://localhost:3000",
    apiUrl: "http://localhost:1337",
  },
  // check https://github.com/garmeeh/next-seo for more information
  // this part is equivalent to content in next-seo.config
  SEO: {
    title: "Your Awesome Site",
    canonical: "http://localhost:3000",
  },
};

module.exports = SiteConfig;
