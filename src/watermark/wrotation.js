import React from 'react';


export class WRotation extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            rotation: this.props.rotation
        };

        this.handle_rotation_change = this.handle_rotation_change.bind(this);
    }

    handle_rotation_change(event) {
        event.preventDefault();

        const rotation = parseInt(event.target.value);

        this.setState({
            rotation: rotation
        });

        this.props.on_change(rotation);
    }

    render() {
        return (
            <div>
                <label>Watermark rotation ({ this.state.rotation })</label>
                <input type="range" min="0" max="359" step="1" value={ this.state.rotation } class="form-range" onChange={ this.handle_rotation_change }></input>
            </div>
        )
    }
}