import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CommentForm extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Group controlId="formComment">
          <Form.Label>{t("mapView.comment.fieldName")}</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder={t("mapView.comment.commentPlaceholder")}
            onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => {
              this.props.setText(x.currentTarget.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {t("mapView.comment.commentButton")}
        </Button>
      </Form>
    );
  }
}

export default withTranslation()(CommentForm);
