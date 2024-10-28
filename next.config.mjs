/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: `${process.env.AWS_HOST}.s3.amazonaws.com`,
      },
      {
        protocol: "https",
        hostname: "nomadland-project-images.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
