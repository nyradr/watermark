import { Button } from 'bootstrap';
import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { WLine } from './wline';

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
            this.props.on_file_uplad(e.target.result)
        }
              
        fr.readAsArrayBuffer(event.target.files[0]);
    }

    render() {
        const lines = this.props.lines.map((line) => 
            <WLine text={line.text}
                   on_text_change={this.props.on_change_text}
            ></WLine>
        );


        return (
            <div class="d-flex flex-column">
                <Form.Group>
                    <Form.Label>PDF Document to watermark</Form.Label>
                    <Form.Control type="file" onChange={this.handle_upload}></Form.Control>
                    <Form.Text className="text-muted">
                        The PDF document will not leave your computer.
                    </Form.Text>
                </Form.Group>

                <div class="d-flex flex-row justify-content-end">
                    <button class="btn btn-primary btn-sm" onClick={this.props.on_new_line}>Add</button>
                </div>

                <div>
                    {lines}
                </div>
            </div>
        );
    }
}