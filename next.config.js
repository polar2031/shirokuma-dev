/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blogs",
        permanent: false,
      },
    ];
  },
  experimental: {
    outputStandalone: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /site-config.js/,
        process.env.SITE_CONFIG || "site-config.js"
      )
    );
    return config;
  },
};

module.exports = nextConfig;
