"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readline = _interopRequireDefault(require("readline"));

var _loadsh = _interopRequireDefault(require("loadsh"));

var _colors = _interopRequireDefault(require("colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stdout = process.stdout;

function clearLine() {
  _readline.default.clearLine(stdout, 0);

  _readline.default.cursorTo(stdout, 0, null);
}

let ide;
var _default = {
  render: function () {
    stdout.write('/n');
    let count = 0;
    ide = setInterval(() => {
      let symbol;

      if (count % 3 === 0) {
        symbol = '.';
      } else if (count % 3 === 1) {
        symbol = '..';
      } else if (count % 3 === 2) {
        symbol = '...';
      }

      clearLine();
      stdout.write(_colors.default.green('fundebug sourcemap is uploading ' + symbol));
      count++;
    }, 300);
  },
  stop: function () {
    clearInterval(ide);
    clearLine();
    stdout.write(_colors.default.green('fundebug sourcemap upload done  ...\n'));
  },
  success: function (content) {
    console.log(_colors.default.green(content));
  },
  renderErrorList: function (list) {
    let _list = [];

    _loadsh.default.each(list, val => {
      _list = _loadsh.default.concat(_list, val);
    });

    if (_list.length === 0) {
      return;
    }

    _loadsh.default.each(_list, name => {
      console.log(_colors.default.yellow('fundebug sourcemap upload error: ' + name));
    });
  }
};
exports.default = _default;