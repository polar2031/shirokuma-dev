const SEO = {
  title: process.env.NEXT_PUBLIC_SITE || "Next Blog",
  openGraph: {
    type: "website",
    title: process.env.NEXT_PUBLIC_SITE || "Next Blog",
    url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    site_name: process.env.NEXT_PUBLIC_SITE || "Next Blog",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

module.exports = SEO;
