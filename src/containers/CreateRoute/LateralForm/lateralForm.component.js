import React, { Component } from "react";
import { useTranslation } from 'react-i18next';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default class LateralForm extends Component<Props>{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre de la ruta</Form.Label>

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

                <Form.Group controlId="formSurname">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows="3"
                        defaultValue={this.props.description}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            this.props.setDescription(x.currentTarget.value);
                         } }                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear
                </Button>
            </Form>
        );
    }

}
