import React from "react";
import { Form } from "react-bootstrap";

export class WLine extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            'text': this.props.text
        };

        this.handle_text_change = this.handle_text_change.bind(this);
    }

    handle_text_change(event) {
        event.preventDefault();

        const text = event.target.value;
        this.setState({
            'text': text
        });

        this.props.on_text_change(text);
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>Watermark text</Form.Label>
                <Form.Control type="text" value={this.state.text}  onChange={ this.handle_text_change }></Form.Control>
            </Form.Group>
        )
    }
}