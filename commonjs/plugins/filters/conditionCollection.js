"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.freeze");

exports.__esModule = true;
exports.default = void 0;

var _array = require("../../helpers/array");

var _object = require("../../helpers/object");

var _templateLiteralTag = require("../../helpers/templateLiteralTag");

var _localHooks = _interopRequireDefault(require("../../mixins/localHooks"));

var _conditionRegisterer = require("./conditionRegisterer");

var _conjunction = require("./logicalOperations/conjunction");

var _logicalOperationRegisterer = require("./logicalOperationRegisterer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Unexpected operation named `", "`. Possible ones are \n          `disjunction` and `conjunction`."], ["Unexpected operation named \\`", "\\`. Possible ones are\\x20\n          \\`disjunction\\` and \\`conjunction\\`."]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["The column of index ", " has been already applied with a `", "` \n        filter operation. Use `removeConditions` to clear the current conditions and then add new ones. \n        Mind that you cannot mix different types of operations (for instance, if you use `conjunction`, \n        use it consequently for a particular column)."], ["The column of index ", " has been already applied with a \\`", "\\`\\x20\n        filter operation. Use \\`removeConditions\\` to clear the current conditions and then add new ones.\\x20\n        Mind that you cannot mix different types of operations (for instance, if you use \\`conjunction\\`,\\x20\n        use it consequently for a particular column)."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class ConditionCollection
 * @plugin Filters
 */
var ConditionCollection = /*#__PURE__*/function () {
  function ConditionCollection() {
    _classCallCheck(this, ConditionCollection);

    /**
     * Conditions collection grouped by operation type and then column index.
     *
     * @type {object}
     */
    this.conditions = this.initConditionsCollection();
    /**
     * Types of operations grouped by column index.
     *
     * @type {object}
     */

    this.columnTypes = {};
    /**
     * Order of added condition filters.
     *
     * @type {Array}
     */

    this.orderStack = [];
  }
  /**
   * Check if condition collection is empty (so no needed to filter data).
   *
   * @returns {boolean}
   */


  _createClass(ConditionCollection, [{
    key: "isEmpty",
    value: function isEmpty() {
      return !this.orderStack.length;
    }
    /**
     * Check if value is matched to the criteria of conditions chain.
     *
     * @param {object} value Object with `value` and `meta` keys.
     * @param {number} [column] Column index.
     * @returns {boolean}
     */

  }, {
    key: "isMatch",
    value: function isMatch(value, column) {
      var _this = this;

      var result = true;

      if (column === void 0) {
        (0, _object.objectEach)(this.columnTypes, function (columnType, columnIndex) {
          result = _this.isMatchInConditions(_this.conditions[columnType][columnIndex], value, columnType);
          return result;
        });
      } else {
        var columnType = this.columnTypes[column];
        result = this.isMatchInConditions(this.getConditions(column), value, columnType);
      }

      return result;
    }
    /**
     * Check if the value is matches the conditions.
     *
     * @param {Array} conditions List of conditions.
     * @param {object} value Object with `value` and `meta` keys.
     * @param {string} [operationType='conjunction'] Type of conditions operation.
     * @returns {boolean}
     */

  }, {
    key: "isMatchInConditions",
    value: function isMatchInConditions(conditions, value) {
      var operationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _conjunction.OPERATION_ID;
      var result = false;

      if (conditions.length) {
        result = (0, _logicalOperationRegisterer.getOperationFunc)(operationType)(conditions, value);
      } else {
        result = true;
      }

      return result;
    }
    /**
     * Add condition to the collection.
     *
     * @param {number} column Column index.
     * @param {object} conditionDefinition Object with keys:
     *  * `command` Object, Command object with condition name as `key` property.
     *  * `args` Array, Condition arguments.
     * @param {string} [operation='conjunction'] Type of conditions operation.
     * @fires ConditionCollection#beforeAdd
     * @fires ConditionCollection#afterAdd
     */

  }, {
    key: "addCondition",
    value: function addCondition(column, conditionDefinition) {
      var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _conjunction.OPERATION_ID;
      var args = (0, _array.arrayMap)(conditionDefinition.args, function (v) {
        return typeof v === 'string' ? v.toLowerCase() : v;
      });
      var name = conditionDefinition.name || conditionDefinition.command.key;
      this.runLocalHooks('beforeAdd', column);

      if (this.orderStack.indexOf(column) === -1) {
        this.orderStack.push(column);
      }

      var columnType = this.columnTypes[column];

      if (columnType) {
        if (columnType !== operation) {
          throw Error((0, _templateLiteralTag.toSingleLine)(_templateObject(), column, columnType));
        }
      } else {
        if (!this.conditions[operation]) {
          throw new Error((0, _templateLiteralTag.toSingleLine)(_templateObject2(), operation));
        }

        this.columnTypes[column] = operation;
      } // Add condition


      this.getConditions(column).push({
        name: name,
        args: args,
        func: (0, _conditionRegisterer.getCondition)(name, args)
      });
      this.runLocalHooks('afterAdd', column);
    }
    /**
     * Get all added conditions from the collection at specified column index.
     *
     * @param {number} column Column index.
     * @returns {Array} Returns conditions collection as an array.
     */

  }, {
    key: "getConditions",
    value: function getConditions(column) {
      var columnType = this.columnTypes[column];

      if (!columnType) {
        return [];
      }

      if (!this.conditions[columnType][column]) {
        this.conditions[columnType][column] = [];
      }

      return this.conditions[columnType][column];
    }
    /**
     * Export all previously added conditions.
     *
     * @returns {Array}
     */

  }, {
    key: "exportAllConditions",
    value: function exportAllConditions() {
      var _this2 = this;

      var result = [];
      (0, _array.arrayEach)(this.orderStack, function (column) {
        var conditions = (0, _array.arrayMap)(_this2.getConditions(column), function (_ref) {
          var name = _ref.name,
              args = _ref.args;
          return {
            name: name,
            args: args
          };
        });
        var operation = _this2.columnTypes[column];
        result.push({
          column: column,
          operation: operation,
          conditions: conditions
        });
      });
      return result;
    }
    /**
     * Import conditions to the collection.
     *
     * @param {Array} conditions The collection of the conditions.
     */

  }, {
    key: "importAllConditions",
    value: function importAllConditions(conditions) {
      var _this3 = this;

      this.clean();
      (0, _array.arrayEach)(conditions, function (stack) {
        _this3.orderStack.push(stack.column);

        (0, _array.arrayEach)(stack.conditions, function (condition) {
          return _this3.addCondition(stack.column, condition);
        });
      });
    }
    /**
     * Remove conditions at given column index.
     *
     * @param {number} column Column index.
     * @fires ConditionCollection#beforeRemove
     * @fires ConditionCollection#afterRemove
     */

  }, {
    key: "removeConditions",
    value: function removeConditions(column) {
      this.runLocalHooks('beforeRemove', column);

      if (this.orderStack.indexOf(column) >= 0) {
        this.orderStack.splice(this.orderStack.indexOf(column), 1);
      }

      this.clearConditions(column);
      this.runLocalHooks('afterRemove', column);
    }
    /**
     * Clear conditions at specified column index but without clearing stack order.
     *
     * @param {number}column Column index.
     * @fires ConditionCollection#beforeClear
     * @fires ConditionCollection#afterClear
     */

  }, {
    key: "clearConditions",
    value: function clearConditions(column) {
      this.runLocalHooks('beforeClear', column);
      this.getConditions(column).length = 0;
      delete this.columnTypes[column];
      this.runLocalHooks('afterClear', column);
    }
    /**
     * Check if at least one condition was added at specified column index. And if second parameter is passed then additionally
     * check if condition exists under its name.
     *
     * @param {number} column Column index.
     * @param {string} [name] Condition name.
     * @returns {boolean}
     */

  }, {
    key: "hasConditions",
    value: function hasConditions(column, name) {
      var columnType = this.columnTypes[column];
      var result = false;

      if (!columnType) {
        return false;
      }

      var conditions = this.getConditions(column);

      if (name) {
        result = (0, _array.arrayFilter)(conditions, function (condition) {
          return condition.name === name;
        }).length > 0;
      } else {
        result = conditions.length > 0;
      }

      return result;
    }
    /**
     * Clean all conditions collection and reset order stack.
     *
     * @fires ConditionCollection#beforeClean
     * @fires ConditionCollection#afterClean
     */

  }, {
    key: "clean",
    value: function clean() {
      this.runLocalHooks('beforeClean');
      this.columnTypes = Object.create(null);
      this.orderStack.length = 0;
      this.conditions = this.initConditionsCollection();
      this.runLocalHooks('afterClean');
    }
    /**
     * Destroy object.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.clearLocalHooks();
      this.conditions = null;
      this.orderStack = null;
      this.columnTypes = null;
    }
    /**
     * Init conditions collection.
     *
     * @private
     * @returns {object} Returns an initial bucket for conditions.
     */

  }, {
    key: "initConditionsCollection",
    value: function initConditionsCollection() {
      var conditions = Object.create(null);
      (0, _object.objectEach)(_logicalOperationRegisterer.operations, function (_, operation) {
        conditions[operation] = Object.create(null);
      });
      return conditions;
    }
  }]);

  return ConditionCollection;
}();

(0, _object.mixin)(ConditionCollection, _localHooks.default);
var _default = ConditionCollection;
exports.default = _default;