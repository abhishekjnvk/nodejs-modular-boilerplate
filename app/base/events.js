'use strict';
const serviceLocator = require('../helpers/service-locator');
const Event = serviceLocator.get('event');

Event.on('server::started', ['app-listener.startServer']);
Event.on('user::signup', ['user-listener.signup']);
