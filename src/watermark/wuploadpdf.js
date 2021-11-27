import React from 'react';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';

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
                        <OverlayTrigger trigger="hover" placement="auto" overlay={helper}>
                            <div class="btn btn-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                            </div>
                        </OverlayTrigger>
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