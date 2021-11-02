import React from "react";
import { Form } from "react-bootstrap";

export class WLine extends React.Component {
    constructor(props){
        super(props);

        this.handle_text_change = this.handle_text_change.bind(this);
    }

    handle_text_change(event) {
        event.preventDefault();
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>Watermark text</Form.Label>
                <Form.Control type="text" onChange={ this.handle_text_change }></Form.Control>
            </Form.Group>
        )
    }
}