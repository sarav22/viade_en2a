import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormWrapper } from "./lateralForm.style";


export default class LateralForm extends Component<Props>{

    render() {
        return (
            <FormWrapper>
            <Form onSubmit={this.props.handleSubmit}
                                            data-testid={"lateralForm"}
                                            >
                <Form.Group controlId="formName" data-testid={"formName"}>
                    <Form.Label className="label">Nombre de la ruta</Form.Label>

                    <Form.Control
                        required
                        type="text"
                        placeholder="nombre"
                        defaultValue={this.props.name}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            this.props.setName(x.currentTarget.value);
                         } }
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formSurname" data-testid={"formSurname"}>
                    <Form.Label className="label">Descripción</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows="3"
                        defaultValue={this.props.description}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            this.props.setDescription(x.currentTarget.value);
                         } }                    />
                </Form.Group>

                <Button variant="primary" type="submit" data-testid={"submitButton"}>
                    Crear
                </Button>
            </Form>
            </FormWrapper>
        );
    }

}
