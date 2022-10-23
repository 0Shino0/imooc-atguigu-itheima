const { notarize } = require('electron-notarize')

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  const appName = context.packager.appInfo.productFilename

  return await notarize({
    // ascProvider: 'UBB3B7LZSN',
    appBundleId: 'com.toimc.community.desktop',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: 'your-appleId',
    appleIdPassword: 'your-appleId-app-password'
  })
}
