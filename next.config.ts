import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/tours/:path*",
        destination: "/destinations/:path*",
        permanent: true,
      },
      {
        source: "/api/tours",
        destination: "/api/destination-catalog",
        permanent: true,
      },
      {
        source: "/api/tourPost",
        destination: "/api/destinationPost",
        permanent: true,
      },
      {
        source: "/Admin/TourPlace",
        destination: "/Admin/Destinations",
        permanent: true,
      },
      {
        source: "/Admin/forms/tourForm",
        destination: "/Admin/forms/destinationForm",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        pathname: "/wiki/Special:FilePath/**",
      },
      {
      protocol: "https",
      hostname: "upload.wikimedia.org",
      pathname: "/wikipedia/commons/**"
      }
    ],
  },
};

export default nextConfig;
