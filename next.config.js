/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "s-light.tiket.photos",
      "travel-journal-api-bootcamp.do.dibimbing.id",
      "raw.githubusercontent.com",
      "images.unsplash.com",
      "seaworld.com",
      "www.arestravel.com",
      "imgs.search.brave.com",
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn3.gstatic.com",
    ],
  },
};

module.exports = nextConfig;
