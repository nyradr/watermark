import React from 'react';
import { Popover } from 'react-bootstrap';
import { Helper } from './helper';


export class WSlider extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            value: this.props.value
        };

        this.handle_value_change = this.handle_value_change.bind(this);
    }

    handle_value_change(event) {
        event.preventDefault();

        const value = parseInt(event.target.value);

        this.setState({
            value: value
        });

        this.props.on_change(value);
    }

    render() {
        const helper = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">{ this.props.help_title }</Popover.Header>
                <Popover.Body>
                    { this.props.help_content }
                </Popover.Body>
            </Popover>
        );

        return (
            <div class="d-flex flex-column w-100">
                <div class="d-flex flex-row w-100 align-self-center">
                    <label>{ this.props.text } ({ this.state.value })</label>

                    <div class="ms-auto">
                        <Helper helper = { helper }></Helper>
                    </div>
                </div>

                <input type="range"
                       min = { this.props.min } max = { this.props.max } step = { this.props.step }
                       value = { this.state.value } onChange = { this.handle_value_change }
                       class="form-range" 
                ></input>
            </div>
        )
    }
}