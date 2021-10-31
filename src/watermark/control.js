import React from 'react';
import { Container } from 'react-bootstrap';

/**
 * Control panel to upload the pdf, set the parameter and download the result
 */
export class Control extends React.Component {

    constructor(props){
        super(props);

        this.handle_upload = this.handle_upload.bind(this);
    }

    handle_upload(event){
        event.preventDefault();

        var fr=new FileReader();
        
        fr.onload = async (e) => {
            this.props.onFileUplad(e.target.result)
        }
              
        fr.readAsArrayBuffer(event.target.files[0]);
    }

    render() {
        return (
            <Container>
                <input type="file" name="file" onChange={this.handle_upload}></input>
                <button class="btn-primary" onClick={this.handle_upload}>Upload</button>
            </Container>
        );
    }
}