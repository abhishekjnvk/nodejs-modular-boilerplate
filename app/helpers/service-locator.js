const { asClass, asValue, Lifetime, createContainer, listModules } = require('awilix');
const path = require('path');
const { camelCase } = require('lodash');

function ServiceLocator() {
  this.container = createContainer();
  this.register();
}

ServiceLocator.prototype.register = function () {
  this.container.loadModules(
    [
      path.join(__dirname, '../module/*/*/*.controller.js'),
      path.join(__dirname, '../module/*/*/*.service.js'),
    ],
    {
      // eslint-disable-next-line no-unused-vars
      formatName : (_fileName, { path, value: { name } }) => {
        const moduleName = name;

        return camelCase(moduleName);
      },
      resolverOptions : {
        lifetime : Lifetime.SINGLETON,
        register : asClass,
      },
    },
  );
  this.container
    .loadModules([path.join(__dirname, '../service/*service.js')], {
      formatName      : 'camelCase',
      resolverOptions : {
        lifetime : Lifetime.SINGLETON,
        register : asClass,
      },
    })
    .register({
      fs : asValue(require('fs')),
    })
    .register({
      uniqueIdGenerator : asValue(require('./unique-id-generator')),
    })
    .register({
      mongoose : asValue(require('mongoose')),
    })
    .register({
      httpStatus : asValue(require('http-status')),
    })
    .register({
      httpErrors : asValue(require('http-errors')),
    })
    .register({
      storageManager : asValue(require('./storage-manager')),
    })
    .register({
      utils : asValue(require('./utils')),
    })
    .register({
      constants : asValue(require('../base/constants')),
    })
    .register({
      uniqueReqId : asValue(require('./unique-req-id')),
    })
    .register({
      httpContext : asValue(require('express-http-context')),
    })
    .register({
      path : asValue(require('path')),
    })
    .register({
      express : asValue(require('express')),
    })
    .register({
      expressJwt : asValue(require('express-jwt')),
    })
    .register({
      nodemailer : asValue(require('nodemailer')),
    })
    .register({
      glob : asValue(require('glob')),
    })
    .register({
      config : asValue(require('../../config')),
    })
    .loadModules([path.join(__dirname, '../providers/*/index.js')], {
      formatName      : (_, descriptor) => camelCase(descriptor.value.name),
      resolverOptions : {
        lifetime : Lifetime.SINGLETON,
        register : asClass,
      },
    })
    .loadModules([path.join(__dirname, '../templates/*.js')], {
      formatName      : (_, descriptor) => camelCase(descriptor.value.name),
      resolverOptions : {
        lifetime : Lifetime.SINGLETON,
        register : asClass,
      },
    });

  const modules = listModules([path.join(__dirname, '../module/*/*constants.js')]);
  for (const module of modules) {
    const name = camelCase(module.name);
    this.container.register({
      [name] : asValue(require(module.path)),
    });
  }
};

ServiceLocator.prototype.get = function (dependencyName) {
  try {
    return this.container.resolve(dependencyName);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw err;
  }
};

module.exports = new ServiceLocator();
