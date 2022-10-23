const path = require('path')

// if (process.env.VITE_APP_VERSION === undefined) {
//   const now = new Date()
//   process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${
//     now.getUTCMonth() + 1
//   }.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`
// }

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  asar: false,
  appId: 'com.toimc.community.desktop',
  directories: {
    output: 'dist',
    buildResources: 'buildResources'
  },
  files: ['packages/**/dist/**'],
  extraMetadata: {
    // version: process.env.VITE_APP_VERSION
    version: '1.0.0'
  },
  productName: 'toimc技术社区HD',
  dmg: {
    background: 'buildResources/background.tiff'
  },
  mac: {
    category: 'public.app-category.lifestyle',
    icon: 'buildResources/icon.icns',
    target: ['mas'],
    entitlements: 'buildResources/entitlements.mas.plist',
    entitlementsInherit: 'buildResources/entitlements.mas.inherit.plist',
    provisioningProfile: path.join(__dirname, './buildResources/toimchd.provisionprofile'),
    bundleVersion: 5,
    bundleShortVersion: '1.0.0'
  },
  win: {
    target: ['nsis', 'zip']
    // verifyUpdateCodeSignature: false,
    // signingHashAlgorithms: ['sha256'],
    // certificateFile: 'XXX.pfx',
    // certificatePassword: 'XXXX'
  },
  mas: {},
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
  }
  // afterSign: 'scripts/notarize.js'
}

module.exports = config
