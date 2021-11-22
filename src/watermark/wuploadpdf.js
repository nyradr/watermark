import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Handle the PDF upload
 */
export class UploadPDF extends React.Component {
    constructor(props){
        super(props);

        this.handle_upload = this.handle_upload.bind(this);
    }


    handle_upload(event){
        event.preventDefault();

        var fr=new FileReader();
        
        fr.onload = async (e) => {
            this.props.on_file_upload(e.target.result)
        }
              
        fr.readAsArrayBuffer(event.target.files[0]);
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>PDF Document to watermark</Form.Label>
                <Form.Control type="file" accept=".pdf" onChange={ this.handle_upload }></Form.Control>
                <Form.Text className="text-muted">
                    The PDF document will not leave your computer.
                </Form.Text>
            </Form.Group>
        )
    }
}