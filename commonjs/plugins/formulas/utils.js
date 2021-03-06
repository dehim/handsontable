"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

exports.__esModule = true;
exports.isFormulaExpression = isFormulaExpression;
exports.isFormulaExpressionEscaped = isFormulaExpressionEscaped;
exports.unescapeFormulaExpression = unescapeFormulaExpression;
exports.toUpperCaseFormula = toUpperCaseFormula;
exports.cellCoordFactory = cellCoordFactory;

/**
 * Check if provided expression is valid formula expression.
 *
 * @param {*} expression Expression to check.
 * @returns {boolean}
 */
function isFormulaExpression(expression) {
  return typeof expression === 'string' && expression.length >= 2 && expression.charAt(0) === '=';
}
/**
 * Check if provided formula expression is escaped.
 *
 * @param {*} expression Expression to check.
 * @returns {boolean}
 */


function isFormulaExpressionEscaped(expression) {
  return typeof expression === 'string' && expression.charAt(0) === '\'' && expression.charAt(1) === '=';
}
/**
 * Replace escaped formula expression into valid string.
 *
 * @param {string} expression Expression to process.
 * @returns {string}
 */


function unescapeFormulaExpression(expression) {
  return isFormulaExpressionEscaped(expression) ? expression.substr(1) : expression;
}
/**
 * Upper case formula expression.
 *
 * @param {string} expression Formula expression.
 * @returns {string}
 */


function toUpperCaseFormula(expression) {
  var PATTERN = /(\\"|"(?:\\"|[^"])*"|(\+))|(\\'|'(?:\\'|[^'])*'|(\+))/g;
  var strings = expression.match(PATTERN) || [];
  var index = -1;
  return expression.toUpperCase().replace(PATTERN, function () {
    index += 1;
    return strings[index];
  });
}
/**
 * Cell coordinates function factory.
 *
 * @param {string} axis An axis name (`row` or `column`) which default index will be applied to.
 * @param {number} defaultIndex Default index.
 * @returns {Function}
 */


function cellCoordFactory(axis, defaultIndex) {
  return function (cell) {
    return {
      row: axis === 'row' ? defaultIndex : cell.row,
      column: axis === 'column' ? defaultIndex : cell.column
    };
  };
}