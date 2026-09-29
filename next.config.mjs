/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/salary-calculator", destination: "/tools/salary-calculator" },
      { source: "/after-tax", destination: "/tools/after-tax" },
      { source: "/salary-calculator/:slug", destination: "/tools/:slug" },
    ];
  },
};
export default nextConfig;
