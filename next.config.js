/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
