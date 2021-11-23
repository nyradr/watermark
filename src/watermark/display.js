import React from "react";


export class Display extends React.Component{
    render() {
        if (this.props.pdf.length == 0) {
            return (
                <div class="container fluid w-100 h-100">
                    <div class="alert alert-danger mt-5" role="alert">
                        Please upload a valid PDF file.
                    </div>
                </div>
            );
        } else {
            return (
                <div class="container fluid w-100 h-100">
                    <iframe class="w-100 h-100" src={ this.props.pdf } title="PDF preview"></iframe>
                </div>
            );
        }
    }
}