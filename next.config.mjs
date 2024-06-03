/** @type {import('next').NextConfig} */
import process from "node:process"

const nextConfig = {
  output: process.env.NODE_ENV !== "development" ? "export" : "standalone",
}

export default nextConfig
