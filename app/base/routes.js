const serviceLocator = require('../helpers/service-locator');
const path = serviceLocator.get('path')
const logger = serviceLocator.get('logger')
const { promises: { readdir } } = serviceLocator.get('fs')
const glob = serviceLocator.get('glob')
const express = serviceLocator.get('express')
const routers = {};

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

module.exports = function (app) {
  getDirectories(path.join(__dirname, '../module')).then(async modules => {

    modules.map(async module => {
      getDirectories(path.join(__dirname, '../module', module)).then(
        async versions => {
          versions.map(async version => {
            let router = routers[version];
            if (!router) {
              router = express.Router();
              routers[version] = router;
            }

            app.use(`/${version}`, router);
            // logger.info(`Loading module /${version}/${module}`)
            glob(
              `${path.join(__dirname, '../module', module, version)}/*.routes.js`,
              (err, roteFiles) => {
                roteFiles.map(routeFile => {
                  require(routeFile).routes(router, serviceLocator)
                });
              },
            );

          });
        },
      );
    });
  });
};
