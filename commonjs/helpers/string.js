"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

exports.__esModule = true;
exports.toUpperCaseFirst = toUpperCaseFirst;
exports.equalsIgnoreCase = equalsIgnoreCase;
exports.randomString = randomString;
exports.isPercentValue = isPercentValue;
exports.substitute = substitute;
exports.stripTags = stripTags;
exports.sanitize = sanitize;

var _dompurify = require("dompurify");

var _mixed = require("./mixed");

/**
 * Convert string to upper case first letter.
 *
 * @param {string} string String to convert.
 * @returns {string}
 */
function toUpperCaseFirst(string) {
  return string[0].toUpperCase() + string.substr(1);
}
/**
 * Compare strings case insensitively.
 *
 * @param {...string} strings Strings to compare.
 * @returns {boolean}
 */


function equalsIgnoreCase() {
  var unique = [];

  for (var _len = arguments.length, strings = new Array(_len), _key = 0; _key < _len; _key++) {
    strings[_key] = arguments[_key];
  }

  var length = strings.length;

  while (length) {
    length -= 1;
    var string = (0, _mixed.stringify)(strings[length]).toLowerCase();

    if (unique.indexOf(string) === -1) {
      unique.push(string);
    }
  }

  return unique.length === 1;
}
/**
 * Generates a random hex string. Used as namespace for Handsontable instance events.
 *
 * @returns {string} Returns 16-long character random string (eq. `'92b1bfc74ec4'`).
 */


function randomString() {
  /**
   * @returns {string}
   */
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + s4() + s4();
}
/**
 * Checks if value is valid percent.
 *
 * @param {string} value The value to check.
 * @returns {boolean}
 */


function isPercentValue(value) {
  return /^([0-9][0-9]?%$)|(^100%$)/.test(value);
}
/**
 * Substitute strings placed beetwen square brackets into value defined in `variables` object. String names defined in
 * square brackets must be the same as property name of `variables` object.
 *
 * @param {string} template Template string.
 * @param {object} variables Object which contains all available values which can be injected into template.
 * @returns {string}
 */


function substitute(template) {
  var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return "".concat(template).replace(/(?:\\)?\[([^[\]]+)]/g, function (match, name) {
    if (match.charAt(0) === '\\') {
      return match.substr(1, match.length - 1);
    }

    return variables[name] === void 0 ? '' : variables[name];
  });
}
/**
 * Strip any HTML tag from the string.
 *
 * @param {string} string String to cut HTML from.
 * @returns {string}
 */


function stripTags(string) {
  return sanitize("".concat(string), {
    ALLOWED_TAGS: []
  });
}
/**
 * Sanitizes string from potential security vulnerabilities.
 *
 * @param {string} string String to sanitize.
 * @param {object} [options] DOMPurify's configuration object.
 * @returns {string}
 */


function sanitize(string, options) {
  return (0, _dompurify.sanitize)(string, options);
}