import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormWrapper } from "./lateralForm.style";
import { useTranslation } from 'react-i18next';


const LateralForm = props  => {

  
    const { t } = useTranslation();

  

        return (
            <FormWrapper>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label className="label">{t('createRouteView.form.name')}</Form.Label>

                    <Form.Control
                        required
                        type="text"
                        placeholder="nombre"
                        defaultValue={props.name}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            props.setName(x.currentTarget.value);
                         } }
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formSurname">
                    <Form.Label className="label">{t('createRouteView.form.description')}</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows="3"
                        defaultValue={props.description}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            props.setDescription(x.currentTarget.value);
                         } }                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {t('createRouteView.form.createButton')}
                </Button>
            </Form>
            </FormWrapper>
        );
    }

    export default LateralForm;

