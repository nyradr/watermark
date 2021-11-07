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
        return (
            <div class="d-flex flex-row w-100 mt-2">
                <div>
                    <Form.Group>
                        <Form.Label>Watermark text</Form.Label>
                        <Form.Control type="text" value={this.props.line.text}  onChange={ this.handle_text_change }></Form.Control>
                    </Form.Group>
                </div>

                <div class="ms-auto">
                    <button class="btn text-danger btn-sm" onClick={ this.handle_delete }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>

                
            </div>
        )
    }
}