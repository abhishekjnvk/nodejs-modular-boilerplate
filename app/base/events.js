'use strict';
const serviceLocator = require('../helpers/service_locator');
const Event = serviceLocator.get('event');

Event.on('server::started', ['appListener.startServer']);
