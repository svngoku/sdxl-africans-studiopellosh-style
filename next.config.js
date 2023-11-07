/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/spirals",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/spirals",
        permanent: false,
      },
      {
        source: "/t",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
