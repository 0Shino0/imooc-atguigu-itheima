const path = require('path')

if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date()
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${
    now.getUTCMonth() + 1
  }.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'com.toimc.community.desktop',
  directories: {
    output: 'dist',
    buildResources: 'buildResources'
  },
  publish: {
    provider: 'github'
  },
  files: ['packages/**/dist/**', 'packages/main/locales/**'],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION
    // version: '1.0.0'
  },
  productName: 'toimc技术社区HD',
  dmg: {
    background: 'buildResources/background.tiff'
  },
  mac: {
    category: 'public.app-category.lifestyle',
    icon: 'buildResources/icon.icns',
    // target: ['dmg'],
    entitlements: 'buildResources/entitlements.mac.plist',
    entitlementsInherit: 'buildResources/entitlements.mac.plist',
    provisioningProfile: path.join(__dirname, './buildResources/toimchd.provisionprofile'),
    hardenedRuntime: true
    // bundleVersion: 2,
    // bundleShortVersion: 1.0.0
  },
  win: {
    target: ['nsis', 'zip']
    // verifyUpdateCodeSignature: false,
    // signingHashAlgorithms: ['sha256'],
    // certificateFile: 'XXX.pfx',
    // certificatePassword: 'XXXX'
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    shortcutName: 'toimc技术社区'
  },
  linux: {
    target: ['deb', 'tar.xz'],
    category: 'Office',
    executableName: 'toimc-community',
    icon: 'buildResources/icon.png'
  },
  afterSign: 'electron-builder-notarize'
  // afterSign: 'scripts/notarize.js'
}

module.exports = config
