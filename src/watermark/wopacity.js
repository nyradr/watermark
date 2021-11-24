import React from 'react';


export class Wopacity extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            value: this.props.value * 100
        };

        this.handle_value_change = this.handle_value_change.bind(this);
    }

    handle_value_change(event) {
        event.preventDefault();

        const value = parseInt(event.target.value);

        this.setState({
            value: value
        });

        this.props.on_change(value / 100);
    }

    render() {
        return (
            <div>
                <label>Watermark image opacity ({ this.state.value } %)</label>
                <input type="range" min="0" max="100" step="1" value={ this.state.value } class="form-range" onChange={ this.handle_value_change }></input>
            </div>
        )
    }
}