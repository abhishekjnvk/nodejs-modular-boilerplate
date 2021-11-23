const {
  asClass,
  asValue,
  Lifetime,
  createContainer,
} = require('awilix');
const path = require('path');
const { camelCase } = require('lodash');

function ServiceLocator() {
  this.container = createContainer();
  this.register();
}

ServiceLocator.prototype.register = function () {

  this.container
    .loadModules(
      [
        path.join(__dirname,'../module/*/*/*.controller.js'), 
        path.join(__dirname,'../module/*/*/*.service.js')
      ],
      {
        formatName : (fileName, { path, value: { name } }) => {
          let moduleName = name;
          return camelCase(moduleName);
        },
        resolverOptions : {
          lifetime : Lifetime.SINGLETON,
          register : asClass,
        },
      }
    )
    .register({
        fs : asValue(require('fs')),
      })
      .register({
        logger : asValue(require('./logger')),
      })
      .register({
        storage_manager : asValue(require('./storage_manager')),
      })
      .register({
        uniqueReqId : asValue(require('./unique_req_id')),
      })
      .register({
        config : asValue(require('../../config')),
      })
};

ServiceLocator.prototype.get = function (dependencyName) {
  try {
    return this.container.resolve(dependencyName);
  } catch (err) {
    console.log(err)
    throw err;
  }
};

module.exports = new ServiceLocator();
