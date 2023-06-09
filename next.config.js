/** @type {import('next').NextConfig} */

const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ru', 'en',],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

}

module.exports = nextConfig