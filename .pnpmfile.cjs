/* eslint-disable no-undef */
function readPackage(pkg) {
  if (pkg.dependencies && pkg.dependencies['@types/eslint']) {
    pkg.dependencies['@types/eslint'] = 'npm:eslint@9.36.0'
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
