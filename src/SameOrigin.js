import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

// roughly based on https://github.com/ryanseddon/react-frame-component/blob/master/index.js

export default (ComposedComponet) => class extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.renderContent = this.renderContent.bind(this);
        this.onDocument = this.onDocument.bind(this);
    }

    static propTypes = {
    };

    static defaultProps = {
        initialContent: "<!DOCTYPE html><html><head></head><body><div></div></body></html>",
        containerSelector: "body > :first-child"
    };

    componentDidMount() {
        this.renderContent();
    }

    componentDidUpdate() {
        this.renderContent();
    }

    onDocument(doc) {
        this._doc = doc;
        this.renderContent();
    }

    componentWillUnmount() {
        this.clearTimeout();
        ReactDOM.unmountComponentAtNode(this._doc.querySelector(this.props.containerSelector));
    }

    clearTimeout() {
        if (this.timeout == null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    renderContent() {
        this.clearTimeout();

        let doc = this._doc;
        if (doc && doc.readyState === "complete") {

            if (!this._setInitialContent) {
                doc.clear();
                doc.open();
                doc.write(this.props.initialContent);
                doc.close();
                this._setInitialContent = true;
            }

            ReactDOM.render(
                <div>{this.props.children}</div>
            , this._doc.querySelector(this.props.containerSelector));
        } else {
            this.timeout = setTimeout(this.renderContent, 0);
        }
    }

    render() {
        return (
            <ComposedComponet {...this.props} onDocument={this.onDocument} />
        );
    }
}
