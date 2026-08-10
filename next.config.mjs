/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  },
  async rewrites() {
    // Local development proxy to local Python backend.
    // In production (Vercel), client components fetch directly from API_BASE_URL with CORS.
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:8000/api/:path*"
        }
      ];
    }
    return [];
  }
};

export default nextConfig;
