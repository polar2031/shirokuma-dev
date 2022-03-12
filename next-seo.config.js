const SEO = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Next Blog",
  openGraph: {
    type: "website",
    title: process.env.NEXT_PUBLIC_SITE_NAME || "Next Blog",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    site_name: process.env.NEXT_PUBLIC_SITE_NAME || "Next Blog",
    images: [
      {
        url: process.env.NEXT_PUBLIC_SITE_OG_IMG || "",
        alt: process.env.NEXT_PUBLIC_SITE_NAME || "Next Blog",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

module.exports = SEO;
