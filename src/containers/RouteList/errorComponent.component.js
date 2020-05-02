import React, { Component } from "react";
import { withTranslation } from "react-i18next";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
class ErrorComponent extends Component<Props> {
    constructor(props) {
        super(props);
        this.setState({message: this.props.message});
    }

    render() {
        const { t } = this.props;
        return (
            <div className="error">{t("error.removedRoute")}</div>
        );
    }
}

export default withTranslation()(ErrorComponent);