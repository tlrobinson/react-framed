"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (ComposedComponet) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(_class, _Component);

        function _class(props, context) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props, context));

            _underscore2.default.bindAll(_this, "updateChildProps", "handleMessage", "onWindow");
            return _this;
        }

        _createClass(_class, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                window.addEventListener("message", this.handleMessage, false);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                window.removeEventListener("message", this.handleMessage, false);
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(nextProps) {
                if (!_underscore2.default.isEqual(this.props, nextProps)) {
                    this.updateChildProps();
                }
            }
        }, {
            key: "onWindow",
            value: function onWindow(win) {
                this._win = win;
                this.updateChildProps();
            }
        }, {
            key: "updateChildProps",
            value: function updateChildProps() {
                var message = { props: {} };
                Object.entries(this.props).map(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2);

                    var key = _ref2[0];
                    var value = _ref2[1];

                    if (typeof value === "function") {
                        message.props[key] = { __fn: true };
                    } else {
                        message.props[key] = value;
                    }
                });
                try {
                    this._win.postMessage(safeClone(message), "*");
                } catch (e) {
                    console.warn(e);
                }
            }
        }, {
            key: "handleMessage",
            value: function handleMessage(e) {
                if (e.source === this._win && e.data) {
                    if (e.data.forceUpdate) {
                        this.updateChildProps();
                    } else if (e.data.callback) {
                        var _e$data$callback = e.data.callback;
                        var name = _e$data$callback.name;
                        var args = _e$data$callback.args;

                        if (typeof this.props[name] === "function") {
                            var _props;

                            (_props = this.props)[name].apply(_props, _toConsumableArray(args));
                        } else {
                            console.warn("Tried to call missing prop '" + name + "'.");
                        }
                    }
                }
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(ComposedComponet, _extends({}, this.props, { onWindow: this.onWindow }));
            }
        }]);

        return _class;
    }(_react.Component), _class.propTypes = {}, _class.defaultProps = {}, _temp;
};

function safeClone(object) {
    return JSON.parse(JSON.stringify(object, function (key, value) {
        if (Array.isArray(value) || value && value.constructor === Object || value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return value;
        }
    }));
}
