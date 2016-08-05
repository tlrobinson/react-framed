"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Frame = require("./Frame");

Object.defineProperty(exports, "SameOriginFrame", {
  enumerable: true,
  get: function get() {
    return _Frame.SameOriginFrame;
  }
});
Object.defineProperty(exports, "CrossOriginFrame", {
  enumerable: true,
  get: function get() {
    return _Frame.CrossOriginFrame;
  }
});

var _Window = require("./Window");

Object.defineProperty(exports, "SameOriginWindow", {
  enumerable: true,
  get: function get() {
    return _Window.SameOriginWindow;
  }
});
Object.defineProperty(exports, "CrossOriginWindow", {
  enumerable: true,
  get: function get() {
    return _Window.CrossOriginWindow;
  }
});
