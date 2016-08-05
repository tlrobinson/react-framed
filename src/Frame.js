import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import SameOrigin from "./SameOrigin";
import CrossOrigin from "./CrossOrigin";

export default class Frame extends Component {

    static propTypes = {
        onWindow: PropTypes.func,
        onDocument: PropTypes.func
    };

    static defaultProps = {
        frameBorder: 0,
        onWindow: () => {},
        onDocument: () => {}
    };

    componentDidMount() {
        let iframe = ReactDOM.findDOMNode(this);
        this.props.onWindow(iframe.contentWindow);
        this.props.onDocument(iframe.contentDocument);
    }

    render() {
        const { src, style, className, frameBorder } = this.props;
        return (
            <iframe src={src} style={style} className={className} frameBorder={frameBorder} />
        );
    }
}

export const SameOriginFrame = SameOrigin(Frame);
export const CrossOriginFrame = CrossOrigin(Frame);
