"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _oneTapInput = require("./oneTapInput");
Object.keys(_oneTapInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _oneTapInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _oneTapInput[key];
    }
  });
});
//# sourceMappingURL=index.js.map