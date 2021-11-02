import React from "react";
import { Form } from "react-bootstrap";

export class WLine extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: this.props.line.text
        };

        this.handle_text_change = this.handle_text_change.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
    }

    handle_text_change(event) {
        event.preventDefault();

        const text = event.target.value;
        this.setState({
            text: text
        });

        this.props.on_change(this.props.line.id, text);
    }

    handle_delete(event) {
        event.preventDefault();
        this.props.on_delete(this.props.line.id);
    }

    render() {
        console.log("WL")
        console.log(this.props.line)

        return (
            <div class="d-flex flex-row w-100">
                <div>
                    <Form.Group>
                        <Form.Label>Watermark text</Form.Label>
                        <Form.Control type="text" value={this.props.line.text}  onChange={ this.handle_text_change }></Form.Control>
                    </Form.Group>
                </div>

                <div class="ms-auto">
                    <button class="btn btn-danger btn-sm" onClick={ this.handle_delete }>
                        D
                    </button>
                </div>

                
            </div>
        )
    }
}