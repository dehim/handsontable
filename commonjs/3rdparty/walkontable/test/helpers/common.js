"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.immediate");

require("core-js/modules/web.timers");

exports.__esModule = true;
exports.sleep = sleep;
exports.spec = spec;
exports.walkontable = walkontable;
exports.createDataArray = createDataArray;
exports.getData = getData;
exports.getTotalRows = getTotalRows;
exports.getTotalColumns = getTotalColumns;
exports.wheelOnElement = wheelOnElement;
exports.getTableWidth = getTableWidth;
exports.range = range;
exports.createSelectionController = createSelectionController;
exports.getTableTopClone = getTableTopClone;
exports.getTableLeftClone = getTableLeftClone;
exports.getTableCornerClone = getTableCornerClone;
exports.createSpreadsheetData = createSpreadsheetData;
exports.spreadsheetColumnLabel = spreadsheetColumnLabel;
exports.walkontableCalculateScrollbarWidth = walkontableCalculateScrollbarWidth;
exports.getScrollbarWidth = getScrollbarWidth;
exports.expectWtTable = expectWtTable;

var _htmlNormalize = require("./htmlNormalize");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @param {number} [delay=100] The delay in ms after which the Promise is resolved.
 * @returns {Promise}
 */
function sleep() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return Promise.resolve({
    then: function then(resolve) {
      if (delay === 0) {
        setImmediate(resolve);
      } else {
        setTimeout(resolve, delay);
      }
    }
  });
}
/**
 * Test context object.
 *
 * @type {object}
 */


var specContext = {};
/**
 * Get the test case context.
 *
 * @returns {object|null}
 */

function spec() {
  return specContext.spec;
}
/**
 * Create the Walkontable instance with the provided options and cache it as `wotInstance` in the test context.
 *
 * @param {object} options Walkontable options.
 * @param {HTMLTableElement} [table] The table element to base the instance on.
 * @returns {Walkontable}
 */


function walkontable(options, table) {
  var currentSpec = spec();

  if (!table) {
    table = currentSpec.$table[0];
  }

  options.table = table;
  currentSpec.wotInstance = new Walkontable.Core(options);
  return currentSpec.wotInstance;
}
/**
 * Creates the new data into an object returned by "spec()" function.
 *
 * @param {number} [rows=100] The number of rows to generate.
 * @param {number} [cols=4] The number of columns to generate.
 */


function createDataArray() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  spec().data = [];

  for (var i = 0; i < rows; i++) {
    var row = [];

    if (cols > 0) {
      row.push(i);

      for (var j = 0; j < cols - 1; j++) {
        /* eslint-disable no-mixed-operators */

        /* eslint-disable no-bitwise */
        row.push(String.fromCharCode(65 + j % 20).toLowerCase() + (j / 20 | 0 || '')); // | 0 is parseInt - see http://jsperf.com/math-floor-vs-math-round-vs-parseint/18
      }
    }

    spec().data.push(row);
  }
}
/**
 * Returns the date value at specified coordinates.
 *
 * @param {number} row The physical row index.
 * @param {number} col The physical column index.
 * @returns {*}
 */


function getData(row, col) {
  return spec().data[row][col];
}
/**
 * Returns the total rows of the currently used dataset.
 *
 * @returns {number}
 */


function getTotalRows() {
  return spec().data.length;
}
/**
 * Returns the total columns of the currently used dataset.
 *
 * @returns {number}
 */


function getTotalColumns() {
  return spec().data[0] ? spec().data[0].length : 0;
}
/**
 * Simulates WheelEvent on the element.
 *
 * @param {Element} elem Element to dispatch event.
 * @param {number} deltaX Relative distance in px to scroll horizontally.
 * @param {number} deltaY Relative distance in px to scroll vertically.
 */


function wheelOnElement(elem) {
  var deltaX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var deltaY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  elem.dispatchEvent(new WheelEvent('wheel', {
    deltaX: deltaX,
    deltaY: deltaY
  }));
}

beforeEach(function () {
  specContext.spec = this;
  var matchers = {
    toBeInArray: function toBeInArray() {
      return {
        compare: function compare(actual, expected) {
          return {
            pass: Array.isArray(expected) && expected.indexOf(actual) > -1
          };
        }
      };
    },
    toBeFunction: function toBeFunction() {
      return {
        compare: function compare(actual) {
          return {
            pass: typeof actual === 'function'
          };
        }
      };
    },
    toMatchHTML: function toMatchHTML() {
      return {
        compare: function compare(actual, expected) {
          var actualHTML = (0, _htmlNormalize.pretty)((0, _htmlNormalize.normalize)(actual));
          var expectedHTML = (0, _htmlNormalize.pretty)((0, _htmlNormalize.normalize)(expected));
          var result = {
            pass: actualHTML === expectedHTML
          };
          result.message = "Expected ".concat(actualHTML, " NOT to be ").concat(expectedHTML);
          return result;
        }
      };
    },
    toBeAroundValue: function toBeAroundValue() {
      return {
        compare: function compare(actual, expected) {
          var diff = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          var pass = actual >= expected - diff && actual <= expected + diff;
          var message = "Expected ".concat(actual, " to be around ").concat(expected, "\n (between ").concat(expected - diff, " and ").concat(expected + diff, ")");

          if (!pass) {
            message = "Expected ".concat(actual, " NOT to be around ").concat(expected, "\n (between ").concat(expected - diff, " and ").concat(expected + diff, ")");
          }

          return {
            pass: pass,
            message: message
          };
        }
      };
    }
  };
  jasmine.addMatchers(matchers);
});
afterEach(function () {
  specContext.spec = null;
  window.scrollTo(0, 0);
});
/**
 * Returns the table width.
 *
 * @param {Element} elem An table element to check.
 * @returns {number}
 */

function getTableWidth(elem) {
  return $(elem).outerWidth() || $(elem).find('tbody').outerWidth() || $(elem).find('thead').outerWidth(); // IE8 reports 0 as <table> offsetWidth
}
/**
 * Creates an array with data defined by the range.
 *
 * @param {number} start The first index.
 * @param {number} end The last index.
 * @returns {Array}
 */


function range(start, end) {
  if (!arguments.length) {
    return [];
  }

  var from = start;
  var to = end;

  if (arguments.length === 1) {
    to = from;
    from = 0;
  }

  if (to > from) {
    from = [to, to = from][0]; // one-liner for swapping two values
  }

  var result = [];

  while (to < from) {
    to += 1;
    result.push(to);
  }

  return result;
}
/**
 * Creates the selection controller necessary for the Walkontable to make selections typical for Handsontable such as
 * current selection, area selection, selection for autofill and custom borders.
 *
 * @param {object} selections An object with custom selection instances.
 * @returns {object} Selection controller.
 */


function createSelectionController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      current = _ref.current,
      area = _ref.area,
      fill = _ref.fill,
      custom = _ref.custom;

  var currentCtrl = current || new Walkontable.Selection({
    className: 'current',
    border: {
      width: 2,
      color: '#4b89ff'
    }
  });
  var areaCtrl = area || new Walkontable.Selection({
    className: 'area',
    border: {
      width: 1,
      color: '#4b89ff'
    }
  });
  var fillCtrl = fill || new Walkontable.Selection({
    className: 'fill',
    border: {
      width: 1,
      color: '#ff0000'
    }
  });
  var customCtrl = custom || [];
  return _defineProperty({
    getCell: function getCell() {
      return currentCtrl;
    },
    createOrGetArea: function createOrGetArea() {
      return areaCtrl;
    },
    getAreas: function getAreas() {
      return [areaCtrl];
    },
    getFill: function getFill() {
      return fillCtrl;
    }
  }, Symbol.iterator, function () {
    return [fillCtrl, currentCtrl, areaCtrl].concat(_toConsumableArray(customCtrl))[Symbol.iterator]();
  });
}
/**
 * @returns {jQuery}
 */


function getTableTopClone() {
  return $('.ht_clone_top');
}
/**
 * @returns {jQuery}
 */


function getTableLeftClone() {
  return $('.ht_clone_left');
}
/**
 * @returns {jQuery}
 */


function getTableCornerClone() {
  return $('.ht_clone_top_left_corner');
}
/**
 * Creates spreadsheet data as an array of arrays filled with spreadsheet-like label values (e.q "A1", "A2"...).
 *
 * @param {number} rows The number of rows to generate.
 * @param {number} columns The number of columns to generate.
 * @returns {Array}
 */


function createSpreadsheetData(rows, columns) {
  var _rows = [];
  var i;
  var j;

  for (i = 0; i < rows; i++) {
    var row = [];

    for (j = 0; j < columns; j++) {
      row.push(spreadsheetColumnLabel(j) + (i + 1));
    }

    _rows.push(row);
  }

  return _rows;
}

var COLUMN_LABEL_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var COLUMN_LABEL_BASE_LENGTH = COLUMN_LABEL_BASE.length;
/**
 * Generates spreadsheet-like column names: A, B, C, ..., Z, AA, AB, etc.
 *
 * @param {number} index The column index.
 * @returns {string}
 */

function spreadsheetColumnLabel(index) {
  var dividend = index + 1;
  var columnLabel = '';
  var modulo;

  while (dividend > 0) {
    modulo = (dividend - 1) % COLUMN_LABEL_BASE_LENGTH;
    columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
    dividend = parseInt((dividend - modulo) / COLUMN_LABEL_BASE_LENGTH, 10);
  }

  return columnLabel;
}
/**
 * Returns the computed width of the native browser scroll bar.
 *
 * @returns {number}
 */


function walkontableCalculateScrollbarWidth() {
  var inner = document.createElement('div');
  inner.style.height = '200px';
  inner.style.width = '100%';
  var outer = document.createElement('div');
  outer.style.boxSizing = 'content-box';
  outer.style.height = '150px';
  outer.style.left = '0px';
  outer.style.overflow = 'hidden';
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.width = '200px';
  outer.style.visibility = 'hidden';
  outer.appendChild(inner);
  (document.body || document.documentElement).appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  (document.body || document.documentElement).removeChild(outer);
  return w1 - w2;
}

var cachedScrollbarWidth;
/**
 * Returns the computed width of the native browser scroll bar.
 *
 * @returns {number}
 */

function getScrollbarWidth() {
  if (cachedScrollbarWidth === void 0) {
    cachedScrollbarWidth = walkontableCalculateScrollbarWidth();
  }

  return cachedScrollbarWidth;
}
/**
 * Run expectation towards a certain WtTable overlay.
 *
 * @param {*} wt WOT instance.
 * @param {*} callb Callback that will receive wtTable of that overlay.
 * @param {*} name Name of the overlay.
 * @returns {Function}
 */


function expectWtTable(wt, callb, name) {
  var callbAsString = callb.toString().replace(/\s\s+/g, ' ');

  if (name === 'master') {
    return expect(callb(wt.wtTable)).withContext("".concat(name, ": ").concat(callbAsString));
  }

  return expect(callb(wt.wtOverlays["".concat(name, "Overlay")].clone.wtTable)).withContext("".concat(name, ": ").concat(callbAsString));
}