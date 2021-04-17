"use strict";

var _uploader = _interopRequireDefault(require("./lib/uploader.js"));

var _stdout = _interopRequireDefault(require("./lib/stdout.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WebpackFundebugJavascriptSourcemapUpload {
  constructor(options = {}) {
    this.assignOptions(options);
    this.pluginName = 'webpack-fundebug-javascript-sourcemap-upload';
  }

  apply(compiler) {
    const self = this;
    compiler.hooks.emit.tapPromise(this.pluginName, compilation => {
      const assetsKeys = Object.keys(compilation.assets);
      const mapList = [];
      self.options.apikey && assetsKeys.forEach(function (assetsKey) {
        if (/.js.map$/g.test(assetsKey)) {
          mapList.push({
            filename: assetsKey,
            content: _objectSpread({}, compilation.assets[assetsKey])
          });
          delete compilation.assets[assetsKey];
        }
      });

      if (mapList.length === 0) {
        return;
      }

      _stdout.default.render();

      return (0, _uploader.default)(mapList, this.options).then(resList => {
        _stdout.default.stop();

        resList.forEach(({
          config
        }) => {
          _stdout.default.success(`${config.headers.filename}  ---------------  OK`);
        });
      }).catch(err => {
        _stdout.default.stop();

        throw new Error(err);
      });
    });
  }

  assignOptions(options) {
    const defaultOptions = {
      apikey: '',
      appversion: '1.0.0',
      clear: false
    };
    this.options = Object.assign(defaultOptions, options);
  }

}

module.exports = WebpackFundebugJavascriptSourcemapUpload;