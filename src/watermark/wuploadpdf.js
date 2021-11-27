import React from 'react';
import { Form, Popover } from 'react-bootstrap';
import { Helper } from './helper';

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
        const helper = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">File input</Popover.Header>
                <Popover.Body>
                    Put here the PDF you wan't to watermark.
                    The document won't leave your device.
                </Popover.Body>
            </Popover>
        );

        return (
           <div class="form-group d-flew flew-column w-100">
                <div class="d-flex flex-row w-100">
                    <Form.Label>PDF Document to watermark</Form.Label>

                    <div class="ms-auto">
                        <Helper helper = { helper }></Helper>
                    </div>
                </div>
                
                <Form.Control type="file" accept=".pdf" onChange={ this.handle_upload }></Form.Control>
                <Form.Text className="text-muted">
                    The PDF document will not leave your device.
                </Form.Text>
            </div>
        )
    }
}