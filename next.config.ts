import { NextConfig } from 'next'
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin()

const path = require('path')

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config: NextConfig) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@public': path.resolve(__dirname, 'public'),
      '@pages': path.resolve(__dirname, 'src/app'),
      '@components': path.resolve(__dirname, 'src/presentation/components'),
      '@hooks': path.resolve(__dirname, 'src/presentation/hooks'),
      '@layouts': path.resolve(__dirname, 'src/presentation/layouts'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
      '@application': path.resolve(__dirname, 'src/application'),
      '@i18n': path.resolve(__dirname, 'src/i18n'),
    }
    return config
  },
}

module.exports = withNextIntl(nextConfig)

/**
 * @note ไม่ใช้ i18next ให้ใช้ config เดิมข้างล่างนี้
 */

// import { NextConfig } from 'next'
// const path = require('path')

// /**
//  * @type {import('next').NextConfig}
//  */

// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config: NextConfig) => {
// config.resolve.alias = {
//   ...config.resolve.alias,
//   '@public': path.resolve(__dirname, 'public'),
//   '@pages': path.resolve(__dirname, 'src/app'),
//   '@components': path.resolve(__dirname, 'src/presentation/components'),
//   '@hooks': path.resolve(__dirname, 'src/presentation/hooks'),
//   '@layouts': path.resolve(__dirname, 'src/presentation/layouts'),
//   '@config': path.resolve(__dirname, 'src/config'),
//   '@domain': path.resolve(__dirname, 'src/domain'),
//   '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
//   '@presentation': path.resolve(__dirname, 'src/presentation'),
//   '@application': path.resolve(__dirname, 'src/application'),
//   '@i18n': path.resolve(__dirname, 'src/i18n'),
// }
//     return config
//   },
// }

// module.exports = nextConfig
