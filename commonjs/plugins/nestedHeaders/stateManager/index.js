"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _array = require("../../../helpers/array");

var _sourceSettings2 = _interopRequireDefault(require("./sourceSettings"));

var _headersTree2 = _interopRequireDefault(require("./headersTree"));

var _nodeModifiers2 = _interopRequireDefault(require("./nodeModifiers"));

var _constants = require("./constants");

var _matrixGenerator = require("./matrixGenerator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _sourceSettings = new WeakMap();

var _nodeModifiers = new WeakMap();

var _headersTree = new WeakMap();

var _stateMatrix = new WeakMap();

/**
 * The state manager is a source of truth for nested headers configuration.
 * The state generation process is divided into three stages.
 *
 *   +---------------------+  1. User-defined configuration normalization;
 *   │                     │  The source settings class normalizes and shares API for
 *   │   SourceSettings    │  raw settings passed by the developer. It is only consumed by
 *   │                     │  the header tree module.
 *   +---------------------+
 *             │
 *            \│/
 *   +---------------------+  2. Building a tree structure for validation and easier node manipulation;
 *   │                     │  The header tree generates a tree based on source settings for future
 *   │     HeadersTree     │  node manipulation (such as collapsible columns feature). While generating a tree
 *   │                     │  the source settings is checked to see if the configuration has overlapping headers.
 *   +---------------------+  If `true` the colspan matrix generation is skipped, overlapped headers are not supported.
 *             │
 *            \│/
 *   +---------------------+  3. Matrix generation;
 *   │                     │  Based on built trees the matrix generation is performed. That part of code
 *   │  matrix generation  │  generates an array structure similar to normalized data from the SourceSettings
 *   │                     │  but with the difference that this structure contains column settings which changed
 *   +---------------------+  during runtime (after the tree manipulation) e.q after collapse or expand column.
 *                            That settings describes how the TH element should be modified (colspan attribute,
 *                            CSS classes, etc) for a specific column and layer level.
 *
 * @class StateManager
 * @plugin NestedHeaders
 */
var StateManager = /*#__PURE__*/function () {
  function StateManager() {
    _classCallCheck(this, StateManager);

    _sourceSettings.set(this, {
      writable: true,
      value: new _sourceSettings2.default()
    });

    _nodeModifiers.set(this, {
      writable: true,
      value: new _nodeModifiers2.default()
    });

    _headersTree.set(this, {
      writable: true,
      value: new _headersTree2.default(_classPrivateFieldGet(this, _sourceSettings))
    });

    _stateMatrix.set(this, {
      writable: true,
      value: [[]]
    });
  }

  _createClass(StateManager, [{
    key: "setState",

    /**
     * Sets a new state for the nested headers plugin based on settings passed
     * directly to the plugin.
     *
     * @param {Array[]} nestedHeadersSettings The user-defined settings.
     * @returns {boolean} Returns `true` if the settings are processed correctly, `false` otherwise.
     */
    value: function setState(nestedHeadersSettings) {
      _classPrivateFieldGet(this, _sourceSettings).setData(nestedHeadersSettings);

      var hasError = false;

      try {
        _classPrivateFieldGet(this, _headersTree).buildTree();
      } catch (ex) {
        _classPrivateFieldGet(this, _headersTree).clear();

        _classPrivateFieldGet(this, _sourceSettings).clear();

        hasError = true;
      }

      _classPrivateFieldSet(this, _stateMatrix, (0, _matrixGenerator.generateMatrix)(_classPrivateFieldGet(this, _headersTree).getRoots()));

      return hasError;
    }
    /**
     * Sets columns limit to the state will be trimmed. All headers (colspans) which
     * overlap the column limit will be reduced to keep the structure solid.
     *
     * @param {number} columnsCount The number of columns to limit to.
     */

  }, {
    key: "setColumnsLimit",
    value: function setColumnsLimit(columnsCount) {
      _classPrivateFieldGet(this, _sourceSettings).setColumnsLimit(columnsCount);
    }
    /**
     * Merges settings with current plugin state.
     *
     * By default only foreign keys are merged with source state and passed to the tree. But only
     * known keys are exported to matrix.
     *
     * @param {object[]} settings An array of objects to merge with the current source settings.
     *                            It is a requirement that every object has `row` and `col` properties
     *                            which points to the specific header settings object.
     */

  }, {
    key: "mergeStateWith",
    value: function mergeStateWith(settings) {
      var _this = this;

      var transformedSettings = (0, _array.arrayMap)(settings, function (_ref) {
        var row = _ref.row,
            rest = _objectWithoutProperties(_ref, ["row"]);

        return _objectSpread({
          row: row < 0 ? _this.rowCoordsToLevel(row) : row
        }, rest);
      });

      _classPrivateFieldGet(this, _sourceSettings).mergeWith(transformedSettings);

      _classPrivateFieldGet(this, _headersTree).buildTree();

      _classPrivateFieldSet(this, _stateMatrix, (0, _matrixGenerator.generateMatrix)(_classPrivateFieldGet(this, _headersTree).getRoots()));
    }
    /**
     * Maps the current state with a callback. For each header settings the callback function
     * is called. If the function returns value that value is merged with the state.
     *
     * By default only foreign keys are merged with source state and passed to the tree. But only
     * known keys are exported to matrix.
     *
     * @param {Function} callback A function that is called for every header source settings.
     *                            Each time the callback is called, the returned value extends
     *                            header settings.
     */

  }, {
    key: "mapState",
    value: function mapState(callback) {
      _classPrivateFieldGet(this, _sourceSettings).map(callback);

      _classPrivateFieldGet(this, _headersTree).buildTree();

      _classPrivateFieldSet(this, _stateMatrix, (0, _matrixGenerator.generateMatrix)(_classPrivateFieldGet(this, _headersTree).getRoots()));
    }
    /**
     * Maps the current tree nodes with a callback. For each node the callback function
     * is called. If the function returns value that value is added to returned array.
     *
     * @param {Function} callback A function that is called for every tree node.
     *                            Each time the callback is called, the returned value is
     *                            added to returned array.
     * @returns {Array}
     */

  }, {
    key: "mapNodes",
    value: function mapNodes(callback) {
      return (0, _array.arrayReduce)(_classPrivateFieldGet(this, _headersTree).getRoots(), function (acc, rootNode) {
        rootNode.walkDown(function (node) {
          var result = callback(node.data);

          if (result !== void 0) {
            acc.push(result);
          }
        });
        return acc;
      }, []);
    }
    /**
     * Triggers an action (it can be "collapse" or "expand") from the NodeModifiers module. The module
     * modifies a tree structure in such a way as to obtain the correct structure consistent with the
     * called action.
     *
     * @param {string} action An action name to trigger.
     * @param {number} headerLevel Header level index (there is support for negative and positive values).
     * @param {number} columnIndex A visual column index.
     * @returns {object|undefined}
     */

  }, {
    key: "triggerNodeModification",
    value: function triggerNodeModification(action, headerLevel, columnIndex) {
      if (headerLevel < 0) {
        headerLevel = this.rowCoordsToLevel(headerLevel);
      }

      var nodeToProcess = _classPrivateFieldGet(this, _headersTree).getNode(headerLevel, columnIndex);

      var actionResult;

      if (nodeToProcess) {
        actionResult = _classPrivateFieldGet(this, _nodeModifiers).triggerAction(action, nodeToProcess);

        _classPrivateFieldSet(this, _stateMatrix, (0, _matrixGenerator.generateMatrix)(_classPrivateFieldGet(this, _headersTree).getRoots()));
      }

      return actionResult;
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */

    /**
     * @memberof StateManager#
     * @function rowCoordsToLevel
     *
     * Translates row coordinates into header level. The row coordinates counts from -1 to -N
     * and describes headers counting from most closest to most distant from the table.
     * The header levels are counted from 0 to N where 0 describes most distant header
     * from the table.
     *
     *  Row coords             Header level
     *           +--------------+
     *       -3  │ A1 │ A1      │  0
     *           +--------------+
     *       -2  │ B1 │ B2 │ B3 │  1
     *           +--------------+
     *       -1  │ C1 │ C2 │ C3 │  2
     *           +==============+
     *           │    │    │    │
     *           +--------------+
     *           │    │    │    │
     *
     * @param {number} rowIndex A visual row index.
     * @returns {number} Returns unsigned number.
     */

    /* eslint-enable jsdoc/require-description-complete-sentence */

  }, {
    key: "rowCoordsToLevel",
    value: function rowCoordsToLevel(rowIndex) {
      var layersCount = Math.max(this.getLayersCount(), 1);
      var highestPossibleLevel = layersCount - 1;
      var lowestPossibleLevel = 0;
      return Math.min(Math.max(rowIndex + layersCount, lowestPossibleLevel), highestPossibleLevel);
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */

    /**
     * @memberof StateManager#
     * @function levelToRowCoords
     *
     * Translates header level into row coordinates. The row coordinates counts from -1 to -N
     * and describes headers counting from most closest to most distant from the table.
     * The header levels are counted from 0 to N where 0 describes most distant header
     * from the table.
     *
     *  Header level            Row coords
     *           +--------------+
     *        0  │ A1 │ A1      │  -3
     *           +--------------+
     *        1  │ B1 │ B2 │ B3 │  -2
     *           +--------------+
     *        2  │ C1 │ C2 │ C3 │  -1
     *           +==============+
     *           │    │    │    │
     *           +--------------+
     *           │    │    │    │
     *
     * @param {number} headerLevel Header level index.
     * @returns {number} Returns negative number.
     */

    /* eslint-enable jsdoc/require-description-complete-sentence */

  }, {
    key: "levelToRowCoords",
    value: function levelToRowCoords(headerLevel) {
      var layersCount = Math.max(this.getLayersCount(), 1);
      var highestPossibleRow = -1;
      var lowestPossibleRow = -layersCount;
      return Math.min(Math.max(headerLevel - layersCount, lowestPossibleRow), highestPossibleRow);
    }
    /**
     * Gets column header settings for a specified column and header index. The returned object contains
     * all information necessary for header renderers. It contains header label, colspan length, or hidden
     * flag.
     *
     * @param {number} headerLevel Header level (there is support for negative and positive values).
     * @param {number} columnIndex A visual column index.
     * @returns {object}
     */

  }, {
    key: "getHeaderSettings",
    value: function getHeaderSettings(headerLevel, columnIndex) {
      var _classPrivateFieldGet2, _classPrivateFieldGet3;

      if (headerLevel < 0) {
        headerLevel = this.rowCoordsToLevel(headerLevel);
      }

      if (headerLevel >= this.getLayersCount()) {
        return _objectSpread({}, _constants.HEADER_DEFAULT_SETTINGS);
      }

      return (_classPrivateFieldGet2 = (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _stateMatrix)[headerLevel]) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3[columnIndex]) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : _objectSpread({}, _constants.HEADER_DEFAULT_SETTINGS);
    }
    /**
     * The method is helpful in cases where the column index targets in-between currently
     * collapsed column. In that case, the method returns the left-most column index
     * where the nested header begins.
     *
     * @param {number} headerLevel Header level (there is support for negative and positive values).
     * @param {number} columnIndex A visual column index.
     * @returns {number}
     */

  }, {
    key: "findLeftMostColumnIndex",
    value: function findLeftMostColumnIndex(headerLevel, columnIndex) {
      var _this$getHeaderSettin = this.getHeaderSettings(headerLevel, columnIndex),
          isBlank = _this$getHeaderSettin.isBlank;

      if (isBlank === false) {
        return columnIndex;
      }

      var stepBackColumn = columnIndex - 1;

      do {
        var _this$getHeaderSettin2 = this.getHeaderSettings(headerLevel, stepBackColumn),
            blank = _this$getHeaderSettin2.isBlank;

        if (blank === false) {
          break;
        }

        stepBackColumn -= 1;
      } while (columnIndex >= 0);

      return stepBackColumn;
    }
    /**
     * Gets a total number of headers levels.
     *
     * @returns {number}
     */

  }, {
    key: "getLayersCount",
    value: function getLayersCount() {
      return _classPrivateFieldGet(this, _sourceSettings).getLayersCount();
    }
    /**
     * Gets a total number of columns count.
     *
     * @returns {number}
     */

  }, {
    key: "getColumnsCount",
    value: function getColumnsCount() {
      return _classPrivateFieldGet(this, _sourceSettings).getColumnsCount();
    }
    /**
     * Clears the column state manager to the initial state.
     */

  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldSet(this, _stateMatrix, []);

      _classPrivateFieldGet(this, _sourceSettings).clear();

      _classPrivateFieldGet(this, _headersTree).clear();
    }
  }]);

  return StateManager;
}();

exports.default = StateManager;