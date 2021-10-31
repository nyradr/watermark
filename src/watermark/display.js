import React from "react";


export class Display extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <iframe src={this.props.pdf }></iframe>
        );
    }
}