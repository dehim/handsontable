"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.every");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-integer");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _base = _interopRequireDefault(require("../_base"));

var _element = require("../../helpers/dom/element");

var _number = require("../../helpers/number");

var _array = require("../../helpers/array");

var _object = require("../../helpers/object");

var _mixed = require("../../helpers/mixed");

var _plugins = require("../../plugins");

var _predefinedItems = require("../contextMenu/predefinedItems");

var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));

var _hideColumn = _interopRequireDefault(require("./contextMenuItem/hideColumn"));

var _showColumn = _interopRequireDefault(require("./contextMenuItem/showColumn"));

var _translations = require("../../translations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

_pluginHooks.default.getSingleton().register('beforeHideColumns');

_pluginHooks.default.getSingleton().register('afterHideColumns');

_pluginHooks.default.getSingleton().register('beforeUnhideColumns');

_pluginHooks.default.getSingleton().register('afterUnhideColumns');
/**
 * @plugin HiddenColumns
 *
 * @description
 * Plugin allows to hide certain columns. The hiding is achieved by not rendering the columns. The plugin not modifies
 * the source data and do not participate in data transformation (the shape of data returned by `getData*` methods stays intact).
 *
 * Possible plugin settings:
 *  * `copyPasteEnabled` as `Boolean` (default `true`)
 *  * `columns` as `Array`
 *  * `indicators` as `Boolean` (default `false`).
 *
 * @example
 *
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: getData(),
 *   hiddenColumns: {
 *     copyPasteEnabled: true,
 *     indicators: true,
 *     columns: [1, 2, 5]
 *   }
 * });
 *
 * // access to hiddenColumns plugin instance:
 * const hiddenColumnsPlugin = hot.getPlugin('hiddenColumns');
 *
 * // show single column
 * hiddenColumnsPlugin.showColumn(1);
 *
 * // show multiple columns
 * hiddenColumnsPlugin.showColumn(1, 2, 9);
 *
 * // or as an array
 * hiddenColumnsPlugin.showColumns([1, 2, 9]);
 *
 * // hide single column
 * hiddenColumnsPlugin.hideColumn(1);
 *
 * // hide multiple columns
 * hiddenColumnsPlugin.hideColumn(1, 2, 9);
 *
 * // or as an array
 * hiddenColumnsPlugin.hideColumns([1, 2, 9]);
 *
 * // rerender the table to see all changes
 * hot.render();
 * ```
 */


var _settings = new WeakMap();

var _hiddenColumnsMap = new WeakMap();

var HiddenColumns = /*#__PURE__*/function (_BasePlugin) {
  _inherits(HiddenColumns, _BasePlugin);

  var _super = _createSuper(HiddenColumns);

  function HiddenColumns() {
    var _this;

    _classCallCheck(this, HiddenColumns);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _settings.set(_assertThisInitialized(_this), {
      writable: true,
      value: {}
    });

    _hiddenColumnsMap.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    return _this;
  }

  _createClass(HiddenColumns, [{
    key: "isEnabled",

    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` than the {@link HiddenColumns#enablePlugin} method is called.
     *
     * @returns {boolean}
     */
    value: function isEnabled() {
      return !!this.hot.getSettings().hiddenColumns;
    }
    /**
     * Enables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;

      if (this.enabled) {
        return;
      }

      var pluginSettings = this.hot.getSettings().hiddenColumns;

      if ((0, _object.isObject)(pluginSettings)) {
        _classPrivateFieldSet(this, _settings, pluginSettings);

        if ((0, _mixed.isUndefined)(pluginSettings.copyPasteEnabled)) {
          pluginSettings.copyPasteEnabled = true;
        }
      }

      _classPrivateFieldSet(this, _hiddenColumnsMap, new _translations.HidingMap());

      _classPrivateFieldGet(this, _hiddenColumnsMap).addLocalHook('init', function () {
        return _this2.onMapInit();
      });

      this.hot.columnIndexMapper.registerMap(this.pluginName, _classPrivateFieldGet(this, _hiddenColumnsMap));
      this.addHook('afterContextMenuDefaultOptions', function () {
        return _this2.onAfterContextMenuDefaultOptions.apply(_this2, arguments);
      });
      this.addHook('afterGetCellMeta', function (row, col, cellProperties) {
        return _this2.onAfterGetCellMeta(row, col, cellProperties);
      });
      this.addHook('modifyColWidth', function (width, col) {
        return _this2.onModifyColWidth(width, col);
      });
      this.addHook('afterGetColHeader', function () {
        return _this2.onAfterGetColHeader.apply(_this2, arguments);
      });
      this.addHook('modifyCopyableRange', function (ranges) {
        return _this2.onModifyCopyableRange(ranges);
      });

      _get(_getPrototypeOf(HiddenColumns.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Updates the plugin state. This method is executed when {@link Core#updateSettings} is invoked.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();

      _get(_getPrototypeOf(HiddenColumns.prototype), "updatePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.hot.columnIndexMapper.unregisterMap(this.pluginName);

      _classPrivateFieldSet(this, _settings, {});

      _get(_getPrototypeOf(HiddenColumns.prototype), "disablePlugin", this).call(this);

      this.resetCellsMeta();
    }
    /**
     * Shows the provided columns.
     *
     * @param {number[]} columns Array of visual column indexes.
     */

  }, {
    key: "showColumns",
    value: function showColumns(columns) {
      var _this3 = this;

      var currentHideConfig = this.getHiddenColumns();
      var isValidConfig = this.isValidConfig(columns);
      var destinationHideConfig = currentHideConfig;

      var hidingMapValues = _classPrivateFieldGet(this, _hiddenColumnsMap).getValues().slice();

      var isAnyColumnShowed = columns.length > 0;

      if (isValidConfig && isAnyColumnShowed) {
        var physicalColumns = columns.map(function (visualColumn) {
          return _this3.hot.toPhysicalColumn(visualColumn);
        }); // Preparing new values for hiding map.

        (0, _array.arrayEach)(physicalColumns, function (physicalColumn) {
          hidingMapValues[physicalColumn] = false;
        }); // Preparing new hiding config.

        destinationHideConfig = (0, _array.arrayReduce)(hidingMapValues, function (hiddenIndexes, isHidden, physicalIndex) {
          if (isHidden) {
            hiddenIndexes.push(_this3.hot.toVisualColumn(physicalIndex));
          }

          return hiddenIndexes;
        }, []);
      }

      var continueHiding = this.hot.runHooks('beforeUnhideColumns', currentHideConfig, destinationHideConfig, isValidConfig && isAnyColumnShowed);

      if (continueHiding === false) {
        return;
      }

      if (isValidConfig && isAnyColumnShowed) {
        _classPrivateFieldGet(this, _hiddenColumnsMap).setValues(hidingMapValues);
      } // @TODO Should call once per render cycle, currently fired separately in different plugins


      this.hot.view.wt.wtOverlays.adjustElementsSize();
      this.hot.runHooks('afterUnhideColumns', currentHideConfig, destinationHideConfig, isValidConfig && isAnyColumnShowed, isValidConfig && destinationHideConfig.length < currentHideConfig.length);
    }
    /**
     * Shows a single column.
     *
     * @param {...number} column Visual column index.
     */

  }, {
    key: "showColumn",
    value: function showColumn() {
      for (var _len2 = arguments.length, column = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        column[_key2] = arguments[_key2];
      }

      this.showColumns(column);
    }
    /**
     * Hides the columns provided in the array.
     *
     * @param {number[]} columns Array of visual column indexes.
     */

  }, {
    key: "hideColumns",
    value: function hideColumns(columns) {
      var _this4 = this;

      var currentHideConfig = this.getHiddenColumns();
      var isConfigValid = this.isValidConfig(columns);
      var destinationHideConfig = currentHideConfig;

      if (isConfigValid) {
        destinationHideConfig = Array.from(new Set(currentHideConfig.concat(columns)));
      }

      var continueHiding = this.hot.runHooks('beforeHideColumns', currentHideConfig, destinationHideConfig, isConfigValid);

      if (continueHiding === false) {
        return;
      }

      if (isConfigValid) {
        this.hot.batch(function () {
          (0, _array.arrayEach)(columns, function (visualColumn) {
            _classPrivateFieldGet(_this4, _hiddenColumnsMap).setValueAtIndex(_this4.hot.toPhysicalColumn(visualColumn), true);
          });
        });
      }

      this.hot.runHooks('afterHideColumns', currentHideConfig, destinationHideConfig, isConfigValid, isConfigValid && destinationHideConfig.length > currentHideConfig.length);
    }
    /**
     * Hides a single column.
     *
     * @param {...number} column Visual column index.
     */

  }, {
    key: "hideColumn",
    value: function hideColumn() {
      for (var _len3 = arguments.length, column = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        column[_key3] = arguments[_key3];
      }

      this.hideColumns(column);
    }
    /**
     * Returns an array of visual indexes of hidden columns.
     *
     * @returns {number[]}
     */

  }, {
    key: "getHiddenColumns",
    value: function getHiddenColumns() {
      var _this5 = this;

      return (0, _array.arrayMap)(_classPrivateFieldGet(this, _hiddenColumnsMap).getHiddenIndexes(), function (physicalColumnIndex) {
        return _this5.hot.toVisualColumn(physicalColumnIndex);
      });
    }
    /**
     * Checks if the provided column is hidden.
     *
     * @param {number} column Visual column index.
     * @returns {boolean}
     */

  }, {
    key: "isHidden",
    value: function isHidden(column) {
      return _classPrivateFieldGet(this, _hiddenColumnsMap).getValueAtIndex(this.hot.toPhysicalColumn(column)) || false;
    }
    /**
     * Get if trim config is valid. Check whether all of the provided column indexes are within the bounds of the table.
     *
     * @param {Array} hiddenColumns List of hidden column indexes.
     * @returns {boolean}
     */

  }, {
    key: "isValidConfig",
    value: function isValidConfig(hiddenColumns) {
      var nrOfColumns = this.hot.countCols();

      if (Array.isArray(hiddenColumns) && hiddenColumns.length > 0) {
        return hiddenColumns.every(function (visualColumn) {
          return Number.isInteger(visualColumn) && visualColumn >= 0 && visualColumn < nrOfColumns;
        });
      }

      return false;
    }
    /**
     * Reset all rendered cells meta.
     *
     * @private
     */

  }, {
    key: "resetCellsMeta",
    value: function resetCellsMeta() {
      (0, _array.arrayEach)(this.hot.getCellsMeta(), function (meta) {
        if (meta) {
          meta.skipColumnOnPaste = false;
        }
      });
    }
    /**
     * Adds the additional column width for the hidden column indicators.
     *
     * @private
     * @param {number|undefined} width Column width.
     * @param {number} column Visual column index.
     * @returns {number}
     */

  }, {
    key: "onModifyColWidth",
    value: function onModifyColWidth(width, column) {
      // Hook is triggered internally only for the visible columns. Conditional will be handled for the API
      // calls of the `getColWidth` function on not visible indexes.
      if (this.isHidden(column)) {
        return 0;
      }

      if (_classPrivateFieldGet(this, _settings).indicators && (this.isHidden(column + 1) || this.isHidden(column - 1))) {
        // Add additional space for hidden column indicator.
        if (typeof width === 'number' && this.hot.hasColHeaders()) {
          return width + 15;
        }
      }
    }
    /**
     * Sets the copy-related cell meta.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {object} cellProperties Object containing the cell properties.
     */

  }, {
    key: "onAfterGetCellMeta",
    value: function onAfterGetCellMeta(row, column, cellProperties) {
      if (_classPrivateFieldGet(this, _settings).copyPasteEnabled === false && this.isHidden(column)) {
        // Cell property handled by the `Autofill` and the `CopyPaste` plugins.
        cellProperties.skipColumnOnPaste = true;
      }

      if (this.isHidden(column - 1)) {
        cellProperties.className = cellProperties.className || '';

        if (cellProperties.className.indexOf('afterHiddenColumn') === -1) {
          cellProperties.className += ' afterHiddenColumn';
        }
      } else if (cellProperties.className) {
        var classArr = cellProperties.className.split(' ');

        if (classArr.length > 0) {
          var containAfterHiddenColumn = classArr.indexOf('afterHiddenColumn');

          if (containAfterHiddenColumn > -1) {
            classArr.splice(containAfterHiddenColumn, 1);
          }

          cellProperties.className = classArr.join(' ');
        }
      }
    }
    /**
     * Modifies the copyable range, accordingly to the provided config.
     *
     * @private
     * @param {Array} ranges An array of objects defining copyable cells.
     * @returns {Array}
     */

  }, {
    key: "onModifyCopyableRange",
    value: function onModifyCopyableRange(ranges) {
      var _this6 = this;

      // Ranges shouldn't be modified when `copyPasteEnabled` option is set to `true` (by default).
      if (_classPrivateFieldGet(this, _settings).copyPasteEnabled) {
        return ranges;
      }

      var newRanges = [];

      var pushRange = function pushRange(startRow, endRow, startCol, endCol) {
        newRanges.push({
          startRow: startRow,
          endRow: endRow,
          startCol: startCol,
          endCol: endCol
        });
      };

      (0, _array.arrayEach)(ranges, function (range) {
        var isHidden = true;
        var rangeStart = 0;
        (0, _number.rangeEach)(range.startCol, range.endCol, function (visualColumn) {
          if (_this6.isHidden(visualColumn)) {
            if (!isHidden) {
              pushRange(range.startRow, range.endRow, rangeStart, visualColumn - 1);
            }

            isHidden = true;
          } else {
            if (isHidden) {
              rangeStart = visualColumn;
            }

            if (visualColumn === range.endCol) {
              pushRange(range.startRow, range.endRow, rangeStart, visualColumn);
            }

            isHidden = false;
          }
        });
      });
      return newRanges;
    }
    /**
     * Adds the needed classes to the headers.
     *
     * @private
     * @param {number} column Visual column index.
     * @param {HTMLElement} TH Header's TH element.
     */

  }, {
    key: "onAfterGetColHeader",
    value: function onAfterGetColHeader(column, TH) {
      if (!_classPrivateFieldGet(this, _settings).indicators || column < 0) {
        return;
      }

      var classList = [];

      if (column >= 1 && this.isHidden(column - 1)) {
        classList.push('afterHiddenColumn');
      }

      if (column < this.hot.countCols() - 1 && this.isHidden(column + 1)) {
        classList.push('beforeHiddenColumn');
      }

      (0, _element.addClass)(TH, classList);
    }
    /**
     * Add Show-hide columns to context menu.
     *
     * @private
     * @param {object} options An array of objects containing information about the pre-defined Context Menu items.
     */

  }, {
    key: "onAfterContextMenuDefaultOptions",
    value: function onAfterContextMenuDefaultOptions(options) {
      options.items.push({
        name: _predefinedItems.SEPARATOR
      }, (0, _hideColumn.default)(this), (0, _showColumn.default)(this));
    }
    /**
     * On map initialized hook callback.
     *
     * @private
     */

  }, {
    key: "onMapInit",
    value: function onMapInit() {
      if (Array.isArray(_classPrivateFieldGet(this, _settings).columns)) {
        this.hideColumns(_classPrivateFieldGet(this, _settings).columns);
      }
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.hot.columnIndexMapper.unregisterMap(this.pluginName);

      _classPrivateFieldSet(this, _settings, null);

      _classPrivateFieldSet(this, _hiddenColumnsMap, null);

      _get(_getPrototypeOf(HiddenColumns.prototype), "destroy", this).call(this);
    }
  }]);

  return HiddenColumns;
}(_base.default);

(0, _plugins.registerPlugin)('hiddenColumns', HiddenColumns);
var _default = HiddenColumns;
exports.default = _default;