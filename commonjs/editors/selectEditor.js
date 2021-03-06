"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _element = require("./../helpers/dom/element");

var _event = require("./../helpers/dom/event");

var _unicode = require("./../helpers/unicode");

var _baseEditor = _interopRequireWildcard(require("./_baseEditor"));

var _object = require("../helpers/object");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var EDITOR_VISIBLE_CLASS_NAME = 'ht_editor_visible';
/**
 * @private
 * @class SelectEditor
 */

var SelectEditor = /*#__PURE__*/function (_BaseEditor) {
  _inherits(SelectEditor, _BaseEditor);

  var _super = _createSuper(SelectEditor);

  function SelectEditor() {
    _classCallCheck(this, SelectEditor);

    return _super.apply(this, arguments);
  }

  _createClass(SelectEditor, [{
    key: "init",

    /**
     * Initializes editor instance, DOM Element and mount hooks.
     */
    value: function init() {
      this.select = this.hot.rootDocument.createElement('SELECT');
      (0, _element.addClass)(this.select, 'htSelectEditor');
      this.select.style.display = 'none';
      this.hot.rootElement.appendChild(this.select);
      this.registerHooks();
    }
    /**
     * Returns select's value.
     *
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.select.value;
    }
    /**
     * Sets value in the select element.
     *
     * @param {*} value A new select's value.
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      this.select.value = value;
    }
    /**
     * Opens the editor and adjust its size.
     */

  }, {
    key: "open",
    value: function open() {
      var _this = this;

      this._opened = true;
      this.refreshDimensions();
      this.select.style.display = '';
      this.addHook('beforeKeyDown', function () {
        return _this.onBeforeKeyDown();
      });
    }
    /**
     * Closes the editor.
     */

  }, {
    key: "close",
    value: function close() {
      this._opened = false;
      this.select.style.display = 'none';

      if ((0, _element.hasClass)(this.select, EDITOR_VISIBLE_CLASS_NAME)) {
        (0, _element.removeClass)(this.select, EDITOR_VISIBLE_CLASS_NAME);
      }

      this.clearHooks();
    }
    /**
     * Sets focus state on the select element.
     */

  }, {
    key: "focus",
    value: function focus() {
      this.select.focus();
    }
    /**
     * Binds hooks to refresh editor's size after scrolling of the viewport or resizing of columns/rows.
     *
     * @private
     */

  }, {
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;

      this.addHook('afterScrollHorizontally', function () {
        return _this2.refreshDimensions();
      });
      this.addHook('afterScrollVertically', function () {
        return _this2.refreshDimensions();
      });
      this.addHook('afterColumnResize', function () {
        return _this2.refreshDimensions();
      });
      this.addHook('afterRowResize', function () {
        return _this2.refreshDimensions();
      });
    }
    /**
     * Prepares editor's meta data and a list of available options.
     *
     * @param {number} row The visual row index.
     * @param {number} col The visual column index.
     * @param {number|string} prop The column property (passed when datasource is an array of objects).
     * @param {HTMLTableCellElement} td The rendered cell element.
     * @param {*} value The rendered value.
     * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
     */

  }, {
    key: "prepare",
    value: function prepare(row, col, prop, td, value, cellProperties) {
      var _this3 = this;

      _get(_getPrototypeOf(SelectEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);

      var selectOptions = this.cellProperties.selectOptions;
      var options;

      if (typeof selectOptions === 'function') {
        options = this.prepareOptions(selectOptions(this.row, this.col, this.prop));
      } else {
        options = this.prepareOptions(selectOptions);
      }

      (0, _element.empty)(this.select);
      (0, _object.objectEach)(options, function (optionValue, key) {
        var optionElement = _this3.hot.rootDocument.createElement('OPTION');

        optionElement.value = key;
        (0, _element.fastInnerHTML)(optionElement, optionValue);

        _this3.select.appendChild(optionElement);
      });
    }
    /**
     * Creates consistent list of available options.
     *
     * @private
     * @param {Array|object} optionsToPrepare The list of the values to render in the select eleemnt.
     * @returns {object}
     */

  }, {
    key: "prepareOptions",
    value: function prepareOptions(optionsToPrepare) {
      var preparedOptions = {};

      if (Array.isArray(optionsToPrepare)) {
        for (var i = 0, len = optionsToPrepare.length; i < len; i++) {
          preparedOptions[optionsToPrepare[i]] = optionsToPrepare[i];
        }
      } else if (_typeof(optionsToPrepare) === 'object') {
        preparedOptions = optionsToPrepare;
      }

      return preparedOptions;
    }
    /**
     * Refreshes editor's value using source data.
     *
     * @private
     */

  }, {
    key: "refreshValue",
    value: function refreshValue() {
      var sourceData = this.hot.getSourceDataAtCell(this.row, this.prop);
      this.originalValue = sourceData;
      this.setValue(sourceData);
      this.refreshDimensions();
    }
    /**
     * Refreshes editor's size and position.
     *
     * @private
     */

  }, {
    key: "refreshDimensions",
    value: function refreshDimensions() {
      if (this.state !== _baseEditor.EditorState.EDITING) {
        return;
      }

      this.TD = this.getEditedCell(); // TD is outside of the viewport.

      if (!this.TD) {
        this.close();
        return;
      }

      var wtOverlays = this.hot.view.wt.wtOverlays;
      var currentOffset = (0, _element.offset)(this.TD);
      var containerOffset = (0, _element.offset)(this.hot.rootElement);
      var scrollableContainer = wtOverlays.scrollableElement;
      var editorSection = this.checkEditorSection();
      var width = (0, _element.outerWidth)(this.TD) + 1;
      var height = (0, _element.outerHeight)(this.TD) + 1;
      var editTop = currentOffset.top - containerOffset.top - 1 - (scrollableContainer.scrollTop || 0);
      var editLeft = currentOffset.left - containerOffset.left - 1 - (scrollableContainer.scrollLeft || 0);
      var cssTransformOffset;

      switch (editorSection) {
        case 'top':
          cssTransformOffset = (0, _element.getCssTransform)(wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'left':
          cssTransformOffset = (0, _element.getCssTransform)(wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'top-left-corner':
          cssTransformOffset = (0, _element.getCssTransform)(wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'bottom-left-corner':
          cssTransformOffset = (0, _element.getCssTransform)(wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'bottom':
          cssTransformOffset = (0, _element.getCssTransform)(wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode);
          break;

        default:
          break;
      }

      var renderableRow = this.hot.rowIndexMapper.getRenderableFromVisualIndex(this.row);
      var renderableColumn = this.hot.columnIndexMapper.getRenderableFromVisualIndex(this.col);
      var nrOfRenderableRowIndexes = this.hot.rowIndexMapper.getRenderableIndexesLength();
      var firstRowIndexOfTheBottomOverlay = nrOfRenderableRowIndexes - this.hot.view.wt.getSetting('fixedRowsBottom');

      if (renderableRow <= 0 || renderableRow === firstRowIndexOfTheBottomOverlay) {
        editTop += 1;
      }

      if (renderableColumn <= 0) {
        editLeft += 1;
      }

      var selectStyle = this.select.style;

      if (cssTransformOffset && cssTransformOffset !== -1) {
        selectStyle[cssTransformOffset[0]] = cssTransformOffset[1];
      } else {
        (0, _element.resetCssTransform)(this.select);
      }

      var cellComputedStyle = (0, _element.getComputedStyle)(this.TD, this.hot.rootWindow);

      if (parseInt(cellComputedStyle.borderTopWidth, 10) > 0) {
        height -= 1;
      }

      if (parseInt(cellComputedStyle.borderLeftWidth, 10) > 0) {
        width -= 1;
      }

      selectStyle.height = "".concat(height, "px");
      selectStyle.minWidth = "".concat(width, "px");
      selectStyle.top = "".concat(editTop, "px");
      selectStyle.left = "".concat(editLeft, "px");
      selectStyle.margin = '0px';
      (0, _element.addClass)(this.select, EDITOR_VISIBLE_CLASS_NAME);
    }
    /**
     * OnBeforeKeyDown callback.
     *
     * @private
     */

  }, {
    key: "onBeforeKeyDown",
    value: function onBeforeKeyDown() {
      var previousOptionIndex = this.select.selectedIndex - 1;
      var nextOptionIndex = this.select.selectedIndex + 1;

      switch (event.keyCode) {
        case _unicode.KEY_CODES.ARROW_UP:
          if (previousOptionIndex >= 0) {
            this.select[previousOptionIndex].selected = true;
          }

          (0, _event.stopImmediatePropagation)(event);
          event.preventDefault();
          break;

        case _unicode.KEY_CODES.ARROW_DOWN:
          if (nextOptionIndex <= this.select.length - 1) {
            this.select[nextOptionIndex].selected = true;
          }

          (0, _event.stopImmediatePropagation)(event);
          event.preventDefault();
          break;

        default:
          break;
      }
    }
  }]);

  return SelectEditor;
}(_baseEditor.default);

var _default = SelectEditor;
exports.default = _default;