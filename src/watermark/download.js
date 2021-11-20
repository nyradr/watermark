import React from "react";


export class Download extends React.Component{
    render() {
        return (
            <div class="d-flex flex-row p-2">
                <div class="ms-auto">
                    <a href={ this.props.pdf } download class="btn btn-primary">Download</a>
                </div>
            </div>
        );
    }
}