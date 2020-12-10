"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-integer");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = hideRowItem;

var C = _interopRequireWildcard(require("../../../i18n/constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @param {HiddenRows} hiddenRowsPlugin The plugin instance.
 * @returns {object}
 */
function hideRowItem(hiddenRowsPlugin) {
  return {
    key: 'hidden_rows_hide',
    name: function name() {
      var selection = this.getSelectedLast();
      var pluralForm = 0;

      if (Array.isArray(selection)) {
        var _selection = _slicedToArray(selection, 3),
            fromRow = _selection[0],
            toRow = _selection[2];

        if (fromRow - toRow !== 0) {
          pluralForm = 1;
        }
      }

      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_HIDE_ROW, pluralForm);
    },
    callback: function callback() {
      var _this$getSelectedRang = this.getSelectedRangeLast(),
          from = _this$getSelectedRang.from,
          to = _this$getSelectedRang.to;

      var start = Math.max(Math.min(from.row, to.row), 0);
      var end = Math.max(from.row, to.row);
      var rowsToHide = [];

      for (var visualRow = start; visualRow <= end; visualRow += 1) {
        rowsToHide.push(visualRow);
      }

      var firstHiddenRow = rowsToHide[0];
      var lastHiddenRow = rowsToHide[rowsToHide.length - 1]; // Looking for a visual index on the top and then (when not found) on the bottom.

      var rowToSelect = this.rowIndexMapper.getFirstNotHiddenIndex(lastHiddenRow + 1, 1, true, firstHiddenRow - 1);
      hiddenRowsPlugin.hideRows(rowsToHide);

      if (Number.isInteger(rowToSelect) && rowToSelect >= 0) {
        this.selectRows(rowToSelect);
      } else {
        this.deselectCell();
      }

      this.render();
      this.view.wt.wtOverlays.adjustElementsSize(true);
    },
    disabled: false,
    hidden: function hidden() {
      return !(this.selection.isSelectedByRowHeader() || this.selection.isSelectedByCorner());
    }
  };
}