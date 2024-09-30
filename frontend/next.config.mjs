import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  reactStrictMode: false,
  env: {
    app: "CityTrip",
  },
};

export default withNextIntl(nextConfig);
