import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormWrapper } from "./lateralForm.style";
import { useTranslation } from "react-i18next";

const LateralForm = (props) => {
  const setName = props.setName;
  const handleSubmit = props.handleSubmit;
  const setDescription = props.setDescription;
  const { t } = useTranslation();

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label className="label">
            {t("createRouteView.lateralForm.routeName")}
          </Form.Label>

          <Form.Control
            type="text"
            placeholder={t("createRouteView.defaultFormValues.name")}
            onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => {
              setName(x.currentTarget.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formSurname">
          <Form.Label className="label">
            {t("createRouteView.lateralForm.routeDescription")}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder={t("createRouteView.defaultFormValues.description")}
            onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => {
              setDescription(x.currentTarget.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {t("createRouteView.lateralForm.createButton")}
        </Button>
      </Form>
    </FormWrapper>
  );
};
export default LateralForm;
