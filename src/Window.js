import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import SameOrigin from "./SameOrigin";
import CrossOrigin from "./CrossOrigin";

export default class Window extends Component {

    static propTypes = {
        onWindow: PropTypes.func,
        onDocument: PropTypes.func,

        url: PropTypes.string,
        name: PropTypes.string,
        features: PropTypes.string,
        closeOnUnmount: PropTypes.bool
    };

    static defaultProps = {
        onWindow: () => {},
        onDocument: () => {},

        url: null,
        name: "TODO: change me to null",
        features: "menubar=no,location=no,resizable=yes,scrollbars=no,status=no",
        closeOnUnmount: true
    };

    componentWillMount() {
        const { url, name, features } = this.props;
        this._win = window.open(url, name, features);
        this.props.onWindow(this._win);
        this.props.onDocument(this._win.document);
    }

    componentWillUnmount() {
        if (this.props.closeOnUnmount) {
            this._win.close();
        }
    }

    render() {
        return (
            <span style={{ display: "none" }} />
        );
    }
}

export const SameOriginWindow = SameOrigin(Window);
export const CrossOriginWindow = CrossOrigin(Window);
