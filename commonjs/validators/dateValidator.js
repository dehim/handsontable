"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.search");

exports.__esModule = true;
exports.default = dateValidator;
exports.correctFormat = correctFormat;

var _moment = _interopRequireDefault(require("moment"));

var _date = require("../helpers/date");

var _editors = require("../editors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Date cell validator.
 *
 * @private
 * @param {*} value Value of edited cell.
 * @param {Function} callback Callback called with validation result.
 */
function dateValidator(value, callback) {
  var dateEditor = (0, _editors.getEditorInstance)('date', this.instance);
  var valueToValidate = value;
  var valid = true;

  if (valueToValidate === null || valueToValidate === void 0) {
    valueToValidate = '';
  }

  var isValidFormat = (0, _moment.default)(valueToValidate, this.dateFormat || dateEditor.defaultDateFormat, true).isValid();
  var isValidDate = (0, _moment.default)(new Date(valueToValidate)).isValid() || isValidFormat;

  if (this.allowEmpty && valueToValidate === '') {
    isValidDate = true;
    isValidFormat = true;
  }

  if (!isValidDate) {
    valid = false;
  }

  if (!isValidDate && isValidFormat) {
    valid = true;
  }

  if (isValidDate && !isValidFormat) {
    if (this.correctFormat === true) {
      // if format correction is enabled
      var correctedValue = correctFormat(valueToValidate, this.dateFormat);
      var row = this.instance.toVisualRow(this.row);
      var column = this.instance.toVisualColumn(this.col);
      this.instance.setDataAtCell(row, column, correctedValue, 'dateValidator');
      valid = true;
    } else {
      valid = false;
    }
  }

  callback(valid);
}
/**
 * Format the given string using moment.js' format feature.
 *
 * @param {string} value The value to format.
 * @param {string} dateFormat The date pattern to format to.
 * @returns {string}
 */


function correctFormat(value, dateFormat) {
  var dateFromDate = (0, _moment.default)((0, _date.getNormalizedDate)(value));
  var dateFromMoment = (0, _moment.default)(value, dateFormat);
  var isAlphanumeric = value.search(/[A-z]/g) > -1;
  var date;

  if (dateFromDate.isValid() && dateFromDate.format('x') === dateFromMoment.format('x') || !dateFromMoment.isValid() || isAlphanumeric) {
    date = dateFromDate;
  } else {
    date = dateFromMoment;
  }

  return date.format(dateFormat);
}