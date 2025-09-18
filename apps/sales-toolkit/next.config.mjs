/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  basePath: '/apps/sales-toolkit',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/apps/sales-toolkit',
  },
}

export default nextConfig
