/** @type {import('next').NextConfig} */

module.exports = {
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'res.cloudinary.com'],
  },
};
