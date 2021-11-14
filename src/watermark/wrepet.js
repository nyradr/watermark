import React from 'react';


export class WRepet extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            repet: this.props.repets
        };

        this.handle_repet_change = this.handle_repet_change.bind(this);
    }

    handle_repet_change(event) {
        event.preventDefault();

        const repet = event.target.value;

        this.setState({
            repet: repet
        });

        this.props.on_change(repet);
    }

    render() {
        return (
            <div>
                <label>Number of repetitions ({ this.state.repet })</label>
                <input type="range" min="1" max="42" step="1" value={ this.state.repet } class="form-range" onChange={ this.handle_repet_change }></input>
            </div>
        )
    }
}