"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// roughly based on https://github.com/ryanseddon/react-frame-component/blob/master/index.js

exports.default = function (ComposedComponet) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(_class, _Component);

        function _class(props, context) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props, context));

            _this.state = {};

            _this.renderContent = _this.renderContent.bind(_this);
            _this.onDocument = _this.onDocument.bind(_this);
            return _this;
        }

        _createClass(_class, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.renderContent();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                this.renderContent();
            }
        }, {
            key: "onDocument",
            value: function onDocument(doc) {
                this._doc = doc;
                this.renderContent();
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.clearTimeout();
                _reactDom2.default.unmountComponentAtNode(this._doc.querySelector(this.props.containerSelector));
            }
        }, {
            key: "clearTimeout",
            value: function (_clearTimeout) {
                function clearTimeout() {
                    return _clearTimeout.apply(this, arguments);
                }

                clearTimeout.toString = function () {
                    return _clearTimeout.toString();
                };

                return clearTimeout;
            }(function () {
                if (this.timeout == null) {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }
            })
        }, {
            key: "renderContent",
            value: function renderContent() {
                this.clearTimeout();

                var doc = this._doc;
                if (doc && doc.readyState === "complete") {

                    if (!this._setInitialContent) {
                        doc.clear();
                        doc.open();
                        doc.write(this.props.initialContent);
                        doc.close();
                        this._setInitialContent = true;
                    }

                    _reactDom2.default.render(_react2.default.createElement(
                        "div",
                        null,
                        this.props.children
                    ), this._doc.querySelector(this.props.containerSelector));
                } else {
                    this.timeout = setTimeout(this.renderContent, 0);
                }
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(ComposedComponet, _extends({}, this.props, { onDocument: this.onDocument }));
            }
        }]);

        return _class;
    }(_react.Component), _class.propTypes = {}, _class.defaultProps = {
        initialContent: "<!DOCTYPE html><html><head></head><body><div></div></body></html>",
        containerSelector: "body > :first-child"
    }, _temp;
};
