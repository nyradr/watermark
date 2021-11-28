import React from "react";
import { Form, Popover } from "react-bootstrap";
import { Helper } from "./helper";

export class WLine extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: this.props.line.text,
            size: this.props.line.size,
            color: this.props.line.color
        };

        this.handle_text_change = this.handle_text_change.bind(this);
        this.handle_size_change = this.handle_size_change.bind(this);
        this.handle_color_change = this.handle_color_change.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
    }

    handle_text_change(event) {
        event.preventDefault();

        const text = event.target.value;
        this.setState({
            text: text
        });

        this.props.on_change(this.props.line.id, text, this.state.size, this.state.color);
    }

    handle_size_change(event) {
        event.preventDefault();

        const size = parseInt(event.target.value);
        this.setState({
            size: size
        });

        this.props.on_change(this.props.line.id, this.state.text, size, this.state.color);
    }

    handle_color_change(event) {
        event.preventDefault();

        const color = event.target.value;
        this.setState({
            color: color
        });

        this.props.on_change(this.props.line.id, this.state.text, this.state.size, color);
    }

    handle_delete(event) {
        event.preventDefault();
        this.props.on_delete(this.props.line.id);
    }

    render() {
        const helper_text = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Watermark text</Popover.Header>
                <Popover.Body>
                    Text that will be displayed.
                </Popover.Body>
            </Popover>
        );

        const helper_size = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Text size</Popover.Header>
                <Popover.Body>
                    Text size.
                </Popover.Body>
            </Popover>
        );

        const helper_color = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Text color</Popover.Header>
                <Popover.Body>
                    Set the text color.
                </Popover.Body>
            </Popover>
        );

        return (
            <div class="d-flex flex-row w-100 mt-2">
                <div>
                    <Form.Group>
                        <div class="d-flex flex-row">
                            <Form.Label>Watermark text</Form.Label>

                            <div class="ms-1">
                                <Helper helper = { helper_text }></Helper>
                            </div>
                        </div>

                        <Form.Control type="text" value={this.props.line.text}  onChange={ this.handle_text_change }></Form.Control>
                    </Form.Group>
                </div>

                <div class="ms-1">
                   <Form.Group>
                        <div class="d-flex flex-row w-100">
                            <Form.Label>Font size</Form.Label>

                            <div class="ms-1">
                                <Helper helper = { helper_size }></Helper>
                            </div>
                        </div>
                        
                        <Form.Select value={this.props.line.size} onChange={ this.handle_size_change }>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                            <option value="128">128</option>
                        </Form.Select>
                    </Form.Group>
                </div>

                <div class="ms-1">
                    <Form.Group>
                        <div class="d-flex flex-row w-100">
                            <Form.Label>Font color</Form.Label>

                            <div class="ms-1">
                                <Helper helper = { helper_color }></Helper>
                            </div>
                        </div>

                        <Form.Control
                            type="color"
                            value={ this.state.color }
                            onChange={ this.handle_color_change }
                            title="Set the line text color."
                        />
                    </Form.Group>
                </div>

                <div class="ms-auto">
                    <div class="text-danger" role="button" onClick={ this.handle_delete }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </div>
                </div>

                
            </div>
        )
    }
}