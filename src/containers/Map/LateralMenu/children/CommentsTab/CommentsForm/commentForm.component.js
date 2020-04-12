import React, { Component } from "react";
import { useTranslation } from 'react-i18next';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default class CommentForm extends Component<Props>{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Form.Group controlId="formComment">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows="3"
                        placeholder="Hey you can comment something here!"
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            this.props.setText(x.currentTarget.value);
                         } }                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Comment
                </Button>
            </Form>
        );
    }

}
