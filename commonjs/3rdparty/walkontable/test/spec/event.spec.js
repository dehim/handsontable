"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

describe('WalkontableEvent', function () {
  var debug = false;
  beforeEach(function () {
    this.$wrapper = $('<div></div>').addClass('handsontable').css({
      overflow: 'hidden'
    });
    this.$wrapper.width(500).height(201);
    this.$container = $('<div></div>');
    this.$table = $('<table></table>').addClass('htCore'); // create a table that is not attached to document

    this.$wrapper.append(this.$container);
    this.$container.append(this.$table);
    this.$wrapper.appendTo('body');
    createDataArray(100, 4);
  });
  afterEach(function () {
    if (!debug) {
      $('.wtHolder').remove();
    }

    this.$wrapper.remove();
    this.wotInstance.destroy();
  });
  it('should call `onCellMouseDown` callback', function () {
    var onCellMouseDown = jasmine.createSpy('onCellMouseDown');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellMouseDown: onCellMouseDown
    });
    wt.draw();
    {
      var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
      var button = 0;
      $td.simulate('mouseover', {
        button: button
      }).simulate('mousemove', {
        button: button
      }).simulate('mousedown', {
        button: button
      }).simulate('mouseup', {
        button: button
      }).simulate('click', {
        button: button
      });
      expect(onCellMouseDown).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
      expect(onCellMouseDown).toHaveBeenCalledTimes(1);
    }
    {
      var _$td = spec().$table.find('tbody tr:eq(2) td:eq(2)');

      var _button = 1;
      onCellMouseDown.calls.reset();

      _$td.simulate('mouseover', {
        button: _button
      }).simulate('mousemove', {
        button: _button
      }).simulate('mousedown', {
        button: _button
      }).simulate('mouseup', {
        button: _button
      }).simulate('click', {
        button: _button
      });

      expect(onCellMouseDown).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(2, 2), _$td[0], jasmine.any(wt.constructor));
      expect(onCellMouseDown).toHaveBeenCalledTimes(1);
    }
    {
      var _$td2 = spec().$table.find('tbody tr:eq(3) td:eq(3)');

      var _button2 = 2;
      onCellMouseDown.calls.reset();

      _$td2.simulate('mouseover', {
        button: _button2
      }).simulate('mousemove', {
        button: _button2
      }).simulate('mousedown', {
        button: _button2
      }).simulate('mouseup', {
        button: _button2
      }).simulate('click', {
        button: _button2
      });

      expect(onCellMouseDown).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(3, 3), _$td2[0], jasmine.any(wt.constructor));
      expect(onCellMouseDown).toHaveBeenCalledTimes(1);
    }
  });
  it('should call `onCellMouseUp` callback', function () {
    var onCellMouseUp = jasmine.createSpy('onCellMouseUp');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellMouseUp: onCellMouseUp
    });
    wt.draw();
    {
      var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
      var button = 0;
      $td.simulate('mouseover', {
        button: button
      }).simulate('mousemove', {
        button: button
      }).simulate('mousedown', {
        button: button
      }).simulate('mouseup', {
        button: button
      }).simulate('click', {
        button: button
      });
      expect(onCellMouseUp).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
      expect(onCellMouseUp).toHaveBeenCalledTimes(1);
    }
    {
      var _$td3 = spec().$table.find('tbody tr:eq(2) td:eq(2)');

      var _button3 = 1;
      onCellMouseUp.calls.reset();

      _$td3.simulate('mouseover', {
        button: _button3
      }).simulate('mousemove', {
        button: _button3
      }).simulate('mousedown', {
        button: _button3
      }).simulate('mouseup', {
        button: _button3
      }).simulate('click', {
        button: _button3
      });

      expect(onCellMouseUp).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(2, 2), _$td3[0], jasmine.any(wt.constructor));
      expect(onCellMouseUp).toHaveBeenCalledTimes(1);
    }
    {
      var _$td4 = spec().$table.find('tbody tr:eq(3) td:eq(3)');

      var _button4 = 2;
      onCellMouseUp.calls.reset();

      _$td4.simulate('mouseover', {
        button: _button4
      }).simulate('mousemove', {
        button: _button4
      }).simulate('mousedown', {
        button: _button4
      }).simulate('mouseup', {
        button: _button4
      }).simulate('click', {
        button: _button4
      });

      expect(onCellMouseUp).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(3, 3), _$td4[0], jasmine.any(wt.constructor));
      expect(onCellMouseUp).toHaveBeenCalledTimes(1);
    }
  });
  it('should call `onCellContextMenu` callback', function () {
    var onCellContextMenu = jasmine.createSpy('onCellContextMenu');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellContextMenu: onCellContextMenu
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('contextmenu');
    expect(onCellContextMenu).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
    expect(onCellContextMenu).toHaveBeenCalledTimes(1);
  });
  it('should call `onCellMouseOver` callback', function () {
    var onCellMouseOver = jasmine.createSpy('onCellMouseOver');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellMouseOver: onCellMouseOver
    });
    wt.draw();
    {
      var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
      var button = 0;
      $td.simulate('mouseover', {
        button: button
      }).simulate('mousemove', {
        button: button
      }).simulate('mousedown', {
        button: button
      }).simulate('mouseup', {
        button: button
      }).simulate('click', {
        button: button
      });
      expect(onCellMouseOver).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
      expect(onCellMouseOver).toHaveBeenCalledTimes(1);
    }
    {
      var _$td5 = spec().$table.find('tbody tr:eq(2) td:eq(2)');

      var _button5 = 1;
      onCellMouseOver.calls.reset();

      _$td5.simulate('mouseover', {
        button: _button5
      }).simulate('mousemove', {
        button: _button5
      }).simulate('mousedown', {
        button: _button5
      }).simulate('mouseup', {
        button: _button5
      }).simulate('click', {
        button: _button5
      });

      expect(onCellMouseOver).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(2, 2), _$td5[0], jasmine.any(wt.constructor));
      expect(onCellMouseOver).toHaveBeenCalledTimes(1);
    }
    {
      var _$td6 = spec().$table.find('tbody tr:eq(3) td:eq(3)');

      var _button6 = 2;
      onCellMouseOver.calls.reset();

      _$td6.simulate('mouseover', {
        button: _button6
      }).simulate('mousemove', {
        button: _button6
      }).simulate('mousedown', {
        button: _button6
      }).simulate('mouseup', {
        button: _button6
      }).simulate('click', {
        button: _button6
      });

      expect(onCellMouseOver).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(3, 3), _$td6[0], jasmine.any(wt.constructor));
      expect(onCellMouseOver).toHaveBeenCalledTimes(1);
    }
  });
  it('should call `onCellMouseOver` callback with correctly passed TD element when cell contains another table', function () {
    var onCellMouseOver = jasmine.createSpy('onCellMouseOver');
    var wt = walkontable({
      data: [['<table style="width: 50px;"><tr><td class="test">TEST</td></tr></table>']],
      totalRows: 1,
      totalColumns: 1,
      onCellMouseOver: onCellMouseOver,
      cellRenderer: function cellRenderer(row, column, TD) {
        TD.innerHTML = wt.wtSettings.getSetting('data', row, column);
      }
    });
    wt.draw();
    var outerTD = spec().$table.find('tbody td:not(td.test)');
    var innerTD = spec().$table.find('tbody td.test');
    innerTD.simulate('mouseover');
    expect(onCellMouseOver.calls.argsFor(0)[2]).toBe(outerTD[0]);
  });
  it('should call `onCellMouseOut` callback', function () {
    var onCellMouseOut = jasmine.createSpy('onCellMouseOut');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellMouseOut: onCellMouseOut
    });
    wt.draw();
    {
      var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
      var button = 0;
      $td.simulate('mouseover', {
        button: button
      }).simulate('mousemove', {
        button: button
      }).simulate('mouseout', {
        button: button
      });
      expect(onCellMouseOut).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
      expect(onCellMouseOut).toHaveBeenCalledTimes(1);
    }
    {
      var _$td7 = spec().$table.find('tbody tr:eq(2) td:eq(2)');

      var _button7 = 1;
      onCellMouseOut.calls.reset();

      _$td7.simulate('mouseover', {
        button: _button7
      }).simulate('mousemove', {
        button: _button7
      }).simulate('mouseout', {
        button: _button7
      });

      expect(onCellMouseOut).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(2, 2), _$td7[0], jasmine.any(wt.constructor));
      expect(onCellMouseOut).toHaveBeenCalledTimes(1);
    }
    {
      var _$td8 = spec().$table.find('tbody tr:eq(3) td:eq(3)');

      var _button8 = 2;
      onCellMouseOut.calls.reset();

      _$td8.simulate('mouseover', {
        button: _button8
      }).simulate('mousemove', {
        button: _button8
      }).simulate('mouseout', {
        button: _button8
      });

      expect(onCellMouseOut).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(3, 3), _$td8[0], jasmine.any(wt.constructor));
      expect(onCellMouseOut).toHaveBeenCalledTimes(1);
    }
  });
  it('should call `onCellMouseOut` callback with correctly passed TD element when cell contains another table', function () {
    var onCellMouseOut = jasmine.createSpy('onCellMouseOut');
    var wt = walkontable({
      data: [['<table style="width: 50px;"><tr><td class="test">TEST</td></tr></table>']],
      totalRows: 1,
      totalColumns: 1,
      onCellMouseOut: onCellMouseOut,
      cellRenderer: function cellRenderer(row, column, TD) {
        TD.innerHTML = wt.wtSettings.getSetting('data', row, column);
      }
    });
    wt.draw();
    var outerTD = spec().$table.find('tbody td:not(td.test)');
    spec().$table.find('tbody td.test').simulate('mouseover').simulate('mousemove').simulate('mouseout');
    expect(onCellMouseOut.calls.argsFor(0)[2]).toBe(outerTD[0]);
  });
  it('should call `onCellDblClick` callback but only for LMB', function () {
    var onCellDblClick = jasmine.createSpy('onCellDblClick');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellDblClick: onCellDblClick
    });
    wt.draw();
    {
      var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
      var button = 0;
      $td.simulate('mousemove', {
        button: button
      }).simulate('mousedown', {
        button: button
      }).simulate('mouseup', {
        button: button
      }).simulate('click', {
        button: button
      }).simulate('mousedown', {
        button: button
      }).simulate('mouseup', {
        button: button
      }).simulate('click', {
        button: button
      }).simulate('dblclick', {
        button: button
      });
      expect(onCellDblClick).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
      expect(onCellDblClick).toHaveBeenCalledTimes(1);
    }
    {
      // Middle button click
      var _$td9 = spec().$table.find('tbody tr:eq(2) td:eq(2)');

      var _button9 = 1;
      onCellDblClick.calls.reset();

      _$td9.simulate('mousemove', {
        button: _button9
      }).simulate('mousedown', {
        button: _button9
      }).simulate('mouseup', {
        button: _button9
      }).simulate('click', {
        button: _button9
      }).simulate('mousedown', {
        button: _button9
      }).simulate('mouseup', {
        button: _button9
      }).simulate('click', {
        button: _button9
      }).simulate('dblclick', {
        button: _button9
      });

      expect(onCellDblClick).toHaveBeenCalledTimes(0);
    }
    {
      // Right button click
      var _$td10 = spec().$table.find('tbody tr:eq(3) td:eq(3)');

      var _button10 = 2;
      onCellDblClick.calls.reset();

      _$td10.simulate('mousemove', {
        button: _button10
      }).simulate('mousedown', {
        button: _button10
      }).simulate('mouseup', {
        button: _button10
      }).simulate('click', {
        button: _button10
      }).simulate('mousedown', {
        button: _button10
      }).simulate('mouseup', {
        button: _button10
      }).simulate('click', {
        button: _button10
      }).simulate('dblclick', {
        button: _button10
      });

      expect(onCellDblClick).toHaveBeenCalledTimes(0);
    }
  });
  it('should call `onCellDblClick` callback, even when it is set only after first click', function () {
    var onCellDblClick = jasmine.createSpy('onCellDblClick');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click');
    wt.update('onCellDblClick', onCellDblClick);
    $td.simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellDblClick).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
  });
  it('should call `onCellMouseDown` callback when clicked on TH', function () {
    var onCellMouseDown = jasmine.createSpy('onCellMouseDown');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = col + 1;
      }],
      onCellMouseDown: onCellMouseDown
    });
    wt.draw();
    spec().$table.find('th:first').simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellMouseDown).toHaveBeenCalledTimes(1);
  });
  it('should not call `onCellMouseDown` callback when clicked on the focusable element (column headers)', function () {
    var opt = ['Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'].map(function (value) {
      return "<option value=\"".concat(value, "\">").concat(value, "</option>");
    }).join('');
    var onCellMouseDown = jasmine.createSpy('onCellMouseDown');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = "#".concat(col, "<select>").concat(opt, "</select>");
      }],
      onCellMouseDown: onCellMouseDown
    });
    wt.draw();
    spec().$table.find('.ht_clone_top th:first select').focus().simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellMouseDown).toHaveBeenCalledTimes(0);
  });
  it('should not call `onCellMouseDown` callback when clicked on the focusable element (cell renderer)', function () {
    var opt = ['Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'].map(function (value) {
      return "<option value=\"".concat(value, "\">").concat(value, "</option>");
    }).join('');
    var onCellMouseDown = jasmine.createSpy('onCellMouseDown');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      cellRenderer: function cellRenderer(row, column, TD) {
        TD.innerHTML = "<select>".concat(opt, "</select>");
      },
      onCellMouseDown: onCellMouseDown
    });
    wt.draw();
    spec().$table.find('td:first select').focus().simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellMouseDown).toHaveBeenCalledTimes(0);
  });
  it('should call `onCellMouseOver` callback when clicked on TH', function () {
    var onCellMouseOver = jasmine.createSpy('onCellMouseOver');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = col + 1;
      }],
      onCellMouseOver: onCellMouseOver
    });
    wt.draw();
    spec().$table.find('th:first').simulate('mouseover').simulate('mousemove');
    expect(onCellMouseOver).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(-1, 0), jasmine.anything(), jasmine.any(wt.constructor));
  });
  it('should call `onCellDblClick` callback when clicked on TH', function () {
    var onCellDblClick = jasmine.createSpy('onCellDblClick');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = col + 1;
      }],
      onCellDblClick: onCellDblClick
    });
    wt.draw();
    spec().$table.find('th:first').simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click').simulate('mousedown').simulate('mouseup').simulate('click').simulate('dblclick');
    expect(onCellDblClick).toHaveBeenCalledTimes(1);
  });
  it('should not call `onCellDblClick` when first mouse up came from mouse drag', function () {
    var onCellDblClick = jasmine.createSpy('onCellDblClick');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellDblClick: onCellDblClick
    });
    wt.draw();
    spec().$table.find('tbody tr:first td:eq(1)').simulate('mousedown');
    spec().$table.find('tbody tr:first td:first').simulate('mouseup').simulate('mousedown').simulate('mouseup').simulate('click').simulate('dblclick');
    expect(onCellDblClick).toHaveBeenCalledTimes(0);
  });
  it('border click should call `onCellDblClick` callback', function () {
    var onCellDblClick = jasmine.createSpy('onCellDblClick');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid'
          }
        })
      }),
      onCellDblClick: onCellDblClick
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(1, 1));
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    spec().$table.parents('.wtHolder').find('.current:first').simulate('mouseover').simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click').simulate('mousedown').simulate('mouseup').simulate('click').simulate('dblclick');
    expect(onCellDblClick).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
    expect(onCellDblClick).toHaveBeenCalledTimes(1);
  });
  it('border click should call `onCellMouseDown` callback', function () {
    var onCellMouseDown = jasmine.createSpy('onCellMouseDown');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid'
          }
        })
      }),
      onCellMouseDown: onCellMouseDown
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(1, 1));
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    spec().$table.parents('.wtHolder').find('.current:first').simulate('mouseover').simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellMouseDown).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
    expect(onCellMouseDown).toHaveBeenCalledTimes(1);
  });
  it('border click should call `onCellMouseUp` callback', function () {
    var onCellMouseUp = jasmine.createSpy('onCellMouseUp');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid'
          }
        })
      }),
      onCellMouseUp: onCellMouseUp
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(1, 1));
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    spec().$table.parents('.wtHolder').find('.current:first').simulate('mouseover').simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellMouseUp).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(1, 1), $td[0], jasmine.any(wt.constructor));
    expect(onCellMouseUp).toHaveBeenCalledTimes(1);
  }); // corner

  it('border click should call `onCellCornerMouseDown` callback', function () {
    var onCellCornerMouseDown = jasmine.createSpy('onCellCornerMouseDown');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid'
          }
        })
      }),
      onCellCornerMouseDown: onCellCornerMouseDown
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(10, 2));
    wt.draw();
    var $el = spec().$table.parents('.wtHolder').find('.current.corner');
    $el.simulate('mouseover').simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellCornerMouseDown).toHaveBeenCalledWith(jasmine.any(MouseEvent), $el[0], void 0, void 0);
    expect(onCellCornerMouseDown).toHaveBeenCalledTimes(1);
  });
  it('border click should call `onCellCornerDblClick` callback, even when it is set only after first click', function () {
    var onCellCornerDblClick = jasmine.createSpy('onCellCornerDblClick');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid'
          }
        })
      })
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(10, 2));
    wt.draw();
    var $td = spec().$table.parents('.wtHolder').find('.current.corner');
    $td.simulate('mousemove').simulate('mousedown').simulate('mouseup').simulate('click');
    wt.update('onCellCornerDblClick', onCellCornerDblClick);
    $td.simulate('mousedown').simulate('mouseup').simulate('click');
    expect(onCellCornerDblClick).toHaveBeenCalledWith(jasmine.any(MouseEvent), new Walkontable.CellCoords(10, 2), -2, jasmine.any(wt.constructor));
  });
  it('should call `onDraw` callback after render', function () {
    var onDraw = jasmine.createSpy('onDraw');
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onDraw: onDraw
    });
    wt.draw();
    expect(onDraw).toHaveBeenCalledTimes(1);
  });
});