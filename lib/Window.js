"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CrossOriginWindow = exports.SameOriginWindow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SameOrigin = require("./SameOrigin");

var _SameOrigin2 = _interopRequireDefault(_SameOrigin);

var _CrossOrigin = require("./CrossOrigin");

var _CrossOrigin2 = _interopRequireDefault(_CrossOrigin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_Component) {
    _inherits(Window, _Component);

    function Window() {
        _classCallCheck(this, Window);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Window).apply(this, arguments));
    }

    _createClass(Window, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _props = this.props;
            var url = _props.url;
            var name = _props.name;
            var features = _props.features;

            this._win = window.open(url, name, features);
            this.props.onWindow(this._win);
            this.props.onDocument(this._win.document);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.props.closeOnUnmount) {
                this._win.close();
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("span", { style: { display: "none" } });
        }
    }]);

    return Window;
}(_react.Component);

Window.propTypes = {
    onWindow: _react.PropTypes.func,
    onDocument: _react.PropTypes.func,

    url: _react.PropTypes.string,
    name: _react.PropTypes.string,
    features: _react.PropTypes.string,
    closeOnUnmount: _react.PropTypes.bool
};
Window.defaultProps = {
    onWindow: function onWindow() {},
    onDocument: function onDocument() {},

    url: null,
    name: "TODO: change me to null",
    features: "menubar=no,location=no,resizable=yes,scrollbars=no,status=no",
    closeOnUnmount: true
};
exports.default = Window;
var SameOriginWindow = exports.SameOriginWindow = (0, _SameOrigin2.default)(Window);
var CrossOriginWindow = exports.CrossOriginWindow = (0, _CrossOrigin2.default)(Window);
