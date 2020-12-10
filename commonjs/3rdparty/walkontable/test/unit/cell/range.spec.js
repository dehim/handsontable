"use strict";

var _range11 = _interopRequireDefault(require("walkontable/cell/range"));

var _coords = _interopRequireDefault(require("walkontable/cell/coords"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CellRange', function () {
  describe('constructor()', function () {
    it('should clone each passed coordinates while assigning', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(3, 4);
      var to = new _coords.default(5, 6);
      var range = new _range11.default(highlight, from, to);
      expect(range.highlight.row).toBe(0);
      expect(range.highlight.col).toBe(0);
      expect(range.highlight).not.toBe(highlight);
      expect(range.from.row).toBe(from.row);
      expect(range.from.col).toBe(from.col);
      expect(range.from).not.toBe(from);
      expect(range.to.row).toBe(to.row);
      expect(range.to.col).toBe(to.col);
      expect(range.to).not.toBe(to);
    });
  });
  describe('setHighlight()', function () {
    it('should clone the coordinates object while assigning', function () {
      var highlight = new _coords.default(-1, 6);
      var range = new _range11.default(new _coords.default());
      range.setHighlight(highlight);
      expect(range.highlight.row).toBe(0);
      expect(range.highlight.col).toBe(6);
      expect(range.highlight).not.toBe(highlight);
    });
  });
  describe('setFrom()', function () {
    it('should clone the coordinates object while assigning', function () {
      var from = new _coords.default(-1, 6);
      var range = new _range11.default(new _coords.default());
      range.setFrom(from);
      expect(range.from.row).toBe(from.row);
      expect(range.from.col).toBe(from.col);
      expect(range.from).not.toBe(from);
    });
  });
  describe('setTo()', function () {
    it('should clone the coordinates object while assigning', function () {
      var to = new _coords.default(-1, 6);
      var range = new _range11.default(new _coords.default());
      range.setTo(to);
      expect(range.to.row).toBe(to.row);
      expect(range.to.col).toBe(to.col);
      expect(range.to).not.toBe(to);
    });
  });
  describe('getHeight()', function () {
    it('should return range hight ignoring the negative values (headers) - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-2, 1);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getHeight()).toBe(6);
    });
    it('should return range hight ignoring the negative values (headers) - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-2, 5);
      var to = new _coords.default(5, 1);
      var range = new _range11.default(highlight, from, to);
      expect(range.getHeight()).toBe(6);
    });
    it('should return range hight ignoring the negative values (headers) - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 1);
      var to = new _coords.default(-2, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getHeight()).toBe(6);
    });
    it('should return range hight ignoring the negative values (headers) - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-2, 1);
      var range = new _range11.default(highlight, from, to);
      expect(range.getHeight()).toBe(6);
    });
  });
  describe('getWidth()', function () {
    it('should return range width ignoring the negative values (headers) - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getWidth()).toBe(6);
    });
    it('should return range width ignoring the negative values (headers) - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      expect(range.getWidth()).toBe(6);
    });
    it('should return range width ignoring the negative values (headers) - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(1, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getWidth()).toBe(6);
    });
    it('should return range width ignoring the negative values (headers) - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(1, -2);
      var range = new _range11.default(highlight, from, to);
      expect(range.getWidth()).toBe(6);
    });
  });
  describe('getOuterHeight()', function () {
    it('should return range hight including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-2, 1);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterHeight()).toBe(8);
    });
    it('should return range hight including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-2, 5);
      var to = new _coords.default(5, 1);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterHeight()).toBe(8);
    });
    it('should return range hight including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 1);
      var to = new _coords.default(-2, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterHeight()).toBe(8);
    });
    it('should return range hight including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-2, 1);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterHeight()).toBe(8);
    });
  });
  describe('getOuterWidth()', function () {
    it('should return range width including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterWidth()).toBe(8);
    });
    it('should return range width including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterWidth()).toBe(8);
    });
    it('should return range width including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(1, 5);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterWidth()).toBe(8);
    });
    it('should return range width including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(1, -2);
      var range = new _range11.default(highlight, from, to);
      expect(range.getOuterWidth()).toBe(8);
    });
  });
  describe('getOuterTopLeftCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopLeftCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(-2);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopLeftCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(-2);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopLeftCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(-2);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopLeftCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(-2);
    });
  });
  describe('getOuterBottomRightCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
  });
  describe('getOuterTopRightCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopRightCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopRightCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopRightCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterTopRightCorner();
      expect(topLeft.row).toBe(-1);
      expect(topLeft.col).toBe(5);
    });
  });
  describe('getOuterBottomLeftCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(-2);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(-2);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(-2);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getOuterBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(-2);
    });
  });
  describe('getTopLeftCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopLeftCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(0);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopLeftCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(0);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopLeftCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(0);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopLeftCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(0);
    });
  });
  describe('getBottomRightCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomRightCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(5);
    });
  });
  describe('getTopRightCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopRightCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopRightCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopRightCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(5);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getTopRightCorner();
      expect(topLeft.row).toBe(0);
      expect(topLeft.col).toBe(5);
    });
  });
  describe('getBottomLeftCorner()', function () {
    it('should return most top-left corner coordinates including headers - from top-left to bottom-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, -2);
      var to = new _coords.default(5, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(0);
    });
    it('should return most top-left corner coordinates including headers - from top-right to bottom-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(0);
    });
    it('should return most top-left corner coordinates including headers - from bottom-left to top-right', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, -2);
      var to = new _coords.default(-1, 5);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(0);
    });
    it('should return most top-left corner coordinates including headers - from bottom-right to top-left', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(5, 5);
      var to = new _coords.default(-1, -2);
      var range = new _range11.default(highlight, from, to);
      var topLeft = range.getBottomLeftCorner();
      expect(topLeft.row).toBe(5);
      expect(topLeft.col).toBe(0);
    });
  });
  describe('isSingle()', function () {
    it('should return `true` when `from` and `to` are equals and there is no header selected', function () {
      {
        var range = new _range11.default(new _coords.default(0, 0), new _coords.default(4, 5), new _coords.default(4, 5));
        expect(range.isSingle()).toBe(true);
      }
      {
        var _range = new _range11.default(new _coords.default(0, 0), new _coords.default(0, 0), new _coords.default(0, 0));

        expect(_range.isSingle()).toBe(true);
      }
    });
    it('should return `false` when `from` and `to` are equals and there is header selected', function () {
      {
        var range = new _range11.default(new _coords.default(0, 0), new _coords.default(-1, 0), new _coords.default(-1, 0));
        expect(range.isSingle()).toBe(false);
      }
      {
        var _range2 = new _range11.default(new _coords.default(0, 0), new _coords.default(0, -1), new _coords.default(0, -1));

        expect(_range2.isSingle()).toBe(false);
      }
      {
        var _range3 = new _range11.default(new _coords.default(0, 0), new _coords.default(0, -1), new _coords.default(-1, 0));

        expect(_range3.isSingle()).toBe(false);
      }
    });
    it('should return `false` when `from` and `to` are not equal', function () {
      {
        var range = new _range11.default(new _coords.default(0, 0), new _coords.default(0, 0), new _coords.default(-1, 0));
        expect(range.isSingle()).toBe(false);
      }
      {
        var _range4 = new _range11.default(new _coords.default(0, 0), new _coords.default(0, 0), new _coords.default(0, 1));

        expect(_range4.isSingle()).toBe(false);
      }
      {
        var _range5 = new _range11.default(new _coords.default(0, 0), new _coords.default(0, 0), new _coords.default(1, 0));

        expect(_range5.isSingle()).toBe(false);
      }
      {
        var _range6 = new _range11.default(new _coords.default(0, 0), new _coords.default(0, 0), new _coords.default(1, 1));

        expect(_range6.isSingle()).toBe(false);
      }
      {
        var _range7 = new _range11.default(new _coords.default(0, 0), new _coords.default(-1, 0), new _coords.default(0, 0));

        expect(_range7.isSingle()).toBe(false);
      }
      {
        var _range8 = new _range11.default(new _coords.default(0, 0), new _coords.default(0, 1), new _coords.default(0, 0));

        expect(_range8.isSingle()).toBe(false);
      }
      {
        var _range9 = new _range11.default(new _coords.default(0, 0), new _coords.default(1, 0), new _coords.default(0, 0));

        expect(_range9.isSingle()).toBe(false);
      }
      {
        var _range10 = new _range11.default(new _coords.default(0, 0), new _coords.default(1, 1), new _coords.default(0, 0));

        expect(_range10.isSingle()).toBe(false);
      }
    });
  });
  describe('clone()', function () {
    it('should clone the object', function () {
      var highlight = new _coords.default(-1, -2);
      var from = new _coords.default(-1, 5);
      var to = new _coords.default(5, -2);
      var range = new _range11.default(highlight, from, to);
      var clone = range.clone();
      expect(clone).not.toBe(range);
      expect(clone.highlight).not.toBe(range.highlight);
      expect(clone.highlight.row).toBe(range.highlight.row);
      expect(clone.highlight.col).toBe(range.highlight.col);
      expect(clone.from).not.toBe(range.from);
      expect(clone.from.row).toBe(range.from.row);
      expect(clone.from.col).toBe(range.from.col);
      expect(clone.to).not.toBe(range.to);
      expect(clone.to.row).toBe(range.to.row);
      expect(clone.to.col).toBe(range.to.col);
    });
  });
});