'use strict';

const _ = require('lodash');
const path = require('path');
const EventEmitter = require('eventemitter2').EventEmitter2;

const proxyHandler = {
  get(target, name) {
    return target[name];
  },
};

/**
 * Event class is used to fire events and bind
 * listeners for them.
 *
 * This class makes use of eventemitter2 module
 *
 * @class Event
 * @singleton
 */
class Event{
  constructor() {
    this.emitter = new EventEmitter({
      wildcard    : true,
      delimiter   : '::',
      newListener : false,
    });

    this._namespacedListeners = {};
    this._many = null;
    this._listenersDir = '../../listeners';

    return new Proxy(this, proxyHandler);
  }

  /**
   * Resolves a listener
   *
   * @method _resolveListener
   *
   * @param  {String|Function}         listener
   *
   * @return {Function}
   *
   */
  _resolveListener(listener) {
    try {
      const depPath = listener.split('.');
      if (depPath.length !== 2) {
        throw new Error(`Can not resolve Listener Method ${listener}`);
      }
      const dependencyName = depPath[0];
      const method = depPath[1];

      const dependencyPath = path.resolve(
        __dirname,
        this._listenersDir,
        dependencyName,
      );

      return require(dependencyPath)[method];
    } catch (error) {
      throw new Error(`Can not resolve Listener ${listener}`);
    }
  }

  /**
   * Returns a list of listeners registered
   * for an event
   *
   * @method getListeners
   *
   * @param  {String}  event
   *
   * @return {Array}
   *
   * @example
   * ```js
   * Event.getListeners('http::start')
   * ```
   */
  getListeners(event) {
    return this.emitter.listeners(event);
  }

  /**
   * Returns a boolean indicating whether an
   * event has listeners or not
   *
   * @method hasListeners
   *
   * @param  {String}     event
   *
   * @return {Boolean}
   *
   * @example
   * ```js
   * Event.hasListeners('http::start')
   * ```
   */
  hasListeners(event) {
    return this.listenersCount(event) > 0;
  }

  /**
   * Returns an array of listeners binded for any
   * event.
   *
   * @method listenersAny
   *
   * @return {Array}
   *
   * @example
   * ```js
   * Event.getListenersAny()
   * ```
   */
  getListenersAny() {
    return this.emitter.listenersAny();
  }

  /**
   * Returns a count of total listeners registered
   * for an event
   *
   * @method listenersCount
   *
   * @param  {String}       event
   *
   * @return {Number}
   *
   * @example
   * ```js
   * Event.listenersCount('http::start')
   * ```
   */
  listenersCount(event) {
    return this.getListeners(event).length;
  }

  /**
   * Bind a listener for an event
   *
   * @method when
   * @alias on
   *
   * @param  {String} event
   * @param  {Array|String|Function} listeners
   *
   * @return {void}
   *
   * @example
   * ```js
   * // Closure
   * Event.when('http::start', () => {
   * })
   *
   * // Multiple listeners
   * Event.when('http::start', ['Http.onStart', 'Http.registerViewGlobals'])
   * ```
   */
  when(event, listeners) {
    this.on(event, listeners);
  }

  /**
   * Emits an event
   *
   * @method emit
   * @alias fire
   *
   * @param  {String}    event
   * @param  {...Spread}    args
   *
   * @return {void}
   *
   * @example
   * ```js
   * Event.emit('http::start', server)
   * ```
   */
  emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  /**
   * Emit an event
   *
   * @method fire
   * @alias emit
   *
   * @param  {String}    event
   * @param  {...Spread}    args
   *
   * @return {void}
   */
  fire(event, ...args) {
    this.emit(event, ...args);
  }

  /**
   * Bind a listener only for x number of times
   *
   * @method times
   *
   * @param  {Number} number
   *
   * @chainable
   *
   * @example
   * ```js
   * Event
   *   .times(3)
   *   .when('user::registers', () => {
   *   })
   * ```
   */
  times(number) {
    if (typeof number !== 'number') {
      throw new Error('Event.times() requires valid number');
    }
    this._many = number;

    return this;
  }

  /**
   * Bind a listener for an event
   *
   * @method on
   * @alias when
   *
   * @param  {String} event
   * @param  {Array|String|Function} listeners - A single or multiple listeners
   *
   * @return {void}
   *
   * @example
   * ```js
   * Event.on('http::start', function () {
   * })
   * ```
   */
  on(event, listeners) {
    const times = this._many;
    this._many = null;

    _.each(_.castArray(listeners), listener => {
      if (times > 0) {
        this.emitter.many(event, times, this._resolveListener(listener));
      } else {
        this.emitter.on(event, this._resolveListener(listener));
      }
    });
  }

  /**
   * Bind listener for any event
   *
   * @method onAny
   * @alias any
   *
   * @param  {String|Function|Array} listeners
   *
   * @return {void}
   *
   * @example
   * ```js
   * Event.onAny(function (event, data) {
   * })
   * ```
   */
  onAny(listeners) {
    _.each(_.castArray(listeners), listener => {
      this.emitter.onAny(this._resolveListener(listener));
    });
  }

  /**
   * Bind listener for any event
   *
   * @method any
   * @alias onAny
   *
   * @param  {String|Function|Array} listeners
   *
   * @return {void}
   */
  any(listeners) {
    this.onAny(listeners);
  }

  /**
   * Bind a listener only for one time
   *
   * @method once
   *
   * @param  {String} event
   * @param  {Array|Function|String} listeners
   *
   * @return {void}
   *
   * @example
   * ```js
   * Event.once('user::registerred', function (user) {
   * })
   * ```
   */
  once(event, listeners) {
    _.each(_.castArray(listeners), listener => {
      this.emitter.once(event, this._resolveListener(listener));
    });
  }

  /**
   * Remove listener for a given event.
   *
   * @method off
   * @alias removeListener
   *
   * @param  {String} event
   * @param  {Function|Array|String} listeners
   *
   * @return {void}
   *
   * @example
   * ```js
   * Event.off('user::registerred', 'User.registered')
   *
   * // remove multiple listeners
   * Event.off('user::registerred', ['User.registered', 'Send.email'])
   * ```
   */
  off(event, listeners) {
    this.removeListener(event, listeners);
  }

  /**
   * Removes listeners binded for any event
   *
   * @method offAny
   *
   * @param  {Function|String|Array} listeners
   *
   * @return {void}
   *
   * @example
   * ```js
   * Event.offAny('Http.onStart')
   * ```
   */
  offAny(listeners) {
    _.each(_.castArray(listeners), listener => {
      listener =
        typeof listener === 'string'
          ? this._namespacedListeners[listener]
          : listener;
      this.emitter.offAny(listener);
    });
  }

  /**
   * Removes listener for a given event
   *
   * @method removeListener
   * @alias off
   *
   * @param  {String}       event
   * @param  {Function|String|Array}       listeners
   *
   * @return {void}
   */
  removeListener(event, listeners) {
    _.each(_.castArray(listeners), listener => {
      listener =
        typeof listener === 'string'
          ? this._namespacedListeners[listener]
          : listener;
      this.emitter.off(event, listener);
    });
  }

  /**
   * Removes all listeners for a given event
   *
   * @method removeAllListeners
   *
   * @param  {String}           event
   *
   * @return {void}
   *
   * @example
   * ```js
   * Event.remvoeAllListeners('http::start')
   * ```
   */
  removeAllListeners(event) {
    this.emitter.removeAllListeners(event);
  }
}

module.exports = Event;
