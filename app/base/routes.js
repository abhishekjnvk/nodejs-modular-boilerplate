const glob = require('glob')
const path= require('path')

const { promises: { readdir } } = require('fs')

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

// register routes of all modules
module.exports = function(app) {
  getDirectories(path.join(__dirname, '../module')).then(async files => {
    files.map(async file => {
      getDirectories(path.join(__dirname, '../module', file)).then(async files2 => {
        files2.map(async file2 => {
          // registering routes of all versions
          glob(`${path.join(__dirname, '../module', file, file2)}/*.routes.js`, (err, roteFiles) => {
            roteFiles.map(routeFile => {
              // eslint-disable-next-line security/detect-non-literal-require
              app.use(`/${file2}`, require(routeFile))
            })
          });
        })
      })
    })
  })
}
