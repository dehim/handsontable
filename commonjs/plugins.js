"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.registerPlugin = registerPlugin;
exports.getPlugin = getPlugin;
exports.getRegistredPluginNames = getRegistredPluginNames;
exports.getPluginName = getPluginName;

var _pluginHooks = _interopRequireDefault(require("./pluginHooks"));

var _object = require("./helpers/object");

var _string = require("./helpers/string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utility to register plugins and common namespace for keeping reference to all plugins classes.
 */
var registeredPlugins = new WeakMap();
/**
 * Registers plugin under given name.
 *
 * @param {string} pluginName The plugin name.
 * @param {Function} PluginClass The plugin class.
 */

function registerPlugin(pluginName, PluginClass) {
  var correctedPluginName = (0, _string.toUpperCaseFirst)(pluginName);

  _pluginHooks.default.getSingleton().add('construct', function () {
    if (!registeredPlugins.has(this)) {
      registeredPlugins.set(this, {});
    }

    var holder = registeredPlugins.get(this);

    if (!holder[correctedPluginName]) {
      holder[correctedPluginName] = new PluginClass(this);
    }
  });

  _pluginHooks.default.getSingleton().add('afterDestroy', function () {
    if (registeredPlugins.has(this)) {
      var pluginsHolder = registeredPlugins.get(this);
      (0, _object.objectEach)(pluginsHolder, function (plugin) {
        return plugin.destroy();
      });
      registeredPlugins.delete(this);
    }
  });
}
/**
 * @param {Core} instance The Handsontable instance.
 * @param {string} pluginName The plugin name.
 * @returns {Function} PluginClass Returns plugin instance if exists or `undefined` if not exists.
 */


function getPlugin(instance, pluginName) {
  if (typeof pluginName !== 'string') {
    throw Error('Only strings can be passed as "plugin" parameter');
  }

  var _pluginName = (0, _string.toUpperCaseFirst)(pluginName);

  if (!registeredPlugins.has(instance) || !registeredPlugins.get(instance)[_pluginName]) {
    return void 0;
  }

  return registeredPlugins.get(instance)[_pluginName];
}
/**
 * Get all registred plugins names for concrete Handsontable instance.
 *
 * @param {Core} hotInstance The Handsontable instance.
 * @returns {Array}
 */


function getRegistredPluginNames(hotInstance) {
  return registeredPlugins.has(hotInstance) ? Object.keys(registeredPlugins.get(hotInstance)) : [];
}
/**
 * Get plugin name.
 *
 * @param {Core} hotInstance The Handsontable instance.
 * @param {BasePlugin} plugin The plugin instance.
 * @returns {string|null}
 */


function getPluginName(hotInstance, plugin) {
  var pluginName = null;

  if (registeredPlugins.has(hotInstance)) {
    (0, _object.objectEach)(registeredPlugins.get(hotInstance), function (pluginInstance, name) {
      if (pluginInstance === plugin) {
        pluginName = name;
      }
    });
  }

  return pluginName;
}