/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/salary-calculator", destination: "/tools/salary-calculator" },
      { source: "/salary-calculator/:slug", destination: "/tools/:slug" },
    ];
  },
  async redirects() {
    return [
      // /salary used to be a "common salaries" hub page — that content now lives at /after-tax,
      // and /salary itself points straight at the main gross-to-net calculator.
      { source: "/salary", destination: "/salary-calculator", permanent: true },
      { source: "/salary/:amount", destination: "/after-tax/:amount", permanent: true },
    ];
  },
};
export default nextConfig;
