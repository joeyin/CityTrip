import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  reactStrictMode: false,
  // basePath: "/CityTrip",
  env: {
    app: "CityTrip",
  },
};

export default withNextIntl(nextConfig);
