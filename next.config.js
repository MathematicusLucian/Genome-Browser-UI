/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ag-grid-community', `ag-grid-enterprise', 'ag-grid-react`],
  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty'
  //     }
  //   }
  // },
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                // { key: "Cross-Origin-Opener-Policy", value: "same-origin" }
                // { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
                // res.headers.append('Access-Control-Allow-Credentials', process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS)
                // res.headers.append('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN) // replace this your actual origin
                // res.headers.append('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_ALLOW_METHODS)
                // res.headers.append('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS)
            ]
        }
    ]
  }
}
  
module.exports = nextConfig