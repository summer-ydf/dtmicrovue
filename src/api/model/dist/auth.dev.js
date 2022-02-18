"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("@/config"));

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  token: {
    url: "".concat(_config["default"].API_URL, "/permission/login"),
    name: "登录获取TOKEN",
    post: function post() {
      var data,
          _args = arguments;
      return regeneratorRuntime.async(function post$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              _context.next = 3;
              return regeneratorRuntime.awrap(_request["default"].post(this.url, data));

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }
};
exports["default"] = _default;