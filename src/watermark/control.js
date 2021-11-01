import React from 'react';
import { Container, Form } from 'react-bootstrap';

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
                <Form>
                    <Form.Group>
                        <Form.Label>PDF Document to watermark</Form.Label>
                        <Form.Control type="file" onChange={this.handle_upload}></Form.Control>
                        <Form.Text className="text-muted">
                            The PDF document will not leave your computer.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}