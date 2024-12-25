/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ag-grid-community', `ag-grid-enterprise', 'ag-grid-react`],
}
  
module.exports = nextConfig