/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s-light.tiket.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "travel-journal-api-bootcamp.do.dibimbing.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seaworld.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.arestravel.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
