import React from "react";


export class Display extends React.Component{
    render() {
        return (
            <div class="container fluid w-100 h-100">
                <iframe class="w-100 h-100" src={ this.props.pdf } title="PDF preview"></iframe>
            </div>
        );
    }
}