// @ts-check
import process from 'node:process'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV !== 'development' ? 'export' : 'standalone',
  experimental: {
    instrumentationHook: true,
    reactCompiler: true,
  },
  webpack(config, { isServer }) {
    /**
     * @fixme This is completely redundant. webpack should understand
     * export conditions and don't try to import "msw/browser" code
     * that's clearly marked as client-side only in the app.
     */
    if (isServer) {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/browser', alias: false })
      } else {
        config.resolve.alias['msw/browser'] = false
      }
    } else {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/node', alias: false })
      } else {
        config.resolve.alias['msw/node'] = false
      }
    }

    return config
  },
}

export default nextConfig
