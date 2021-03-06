"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _formData = _interopRequireDefault(require("form-data"));

var _stringToFileStream = _interopRequireDefault(require("string-to-file-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_axios.default.defaults.baseURL = 'https://fundebug.com/javascript/sourcemap';

function getFormData({
  filename,
  content,
  apikey,
  appversion
}) {
  const formData = new _formData.default();
  formData.append('apikey', apikey);
  formData.append('appversion', appversion);
  formData.append('sourceMap', (0, _stringToFileStream.default)(content._value), {
    filename,
    contentType: 'text'
  });
  return formData;
}

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (sourceMapList, options) {
    if (options.clear) {
      yield _axios.default.post('clear', {
        apikey: options.apikey
      });
    }

    const promiseList = sourceMapList.map(sourcemap => {
      const data = getFormData(_objectSpread(_objectSpread({}, sourcemap), options));
      return _axios.default.post('upload', data, {
        headers: _objectSpread(_objectSpread({}, data.getHeaders()), {}, {
          filename: sourcemap.filename
        })
      });
    });
    return _axios.default.all(promiseList);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;