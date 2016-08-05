import React, { Component, PropTypes } from "react";

import _ from "underscore";

export default ComposedComponet => class extends Component {
    constructor(props, context) {
        super(props, context);

        _.bindAll(this, "updateChildProps", "handleMessage", "onWindow");
    }

    static propTypes = {};
    static defaultProps = {};

    componentWillMount() {
        window.addEventListener("message", this.handleMessage, false);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleMessage, false);
    }

    componentDidUpdate(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            this.updateChildProps();
        }
    }

    onWindow(win) {
        this._win = win;
        this.updateChildProps();
    }

    updateChildProps() {
        let message = { props: {} }
        Object.entries(this.props).map(([key, value]) => {
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

    handleMessage(e) {
        if (e.source === this._win && e.data) {
            if (e.data.forceUpdate) {
                this.updateChildProps();
            } else if (e.data.callback) {
                let { name, args } = e.data.callback;
                if (typeof this.props[name] === "function") {
                    this.props[name](...args);
                } else {
                    console.warn("Tried to call missing prop '" + name + "'.")
                }
            }
        }
    }

    render() {
        return <ComposedComponet {...this.props} onWindow={this.onWindow} />;
    }
}

function safeClone(object) {
  return JSON.parse(JSON.stringify(object, function(key, value) {
    if (Array.isArray(value) || (value && value.constructor === Object) ||
      value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return value;
    }
  }));
}
