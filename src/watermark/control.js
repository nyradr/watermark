import React from 'react';
import { Form } from 'react-bootstrap';
import { Download } from './download';
import { WLine } from './wline';
import { WRepet } from './wrepet';
import { WRotation } from './wrotation';

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
            <WLine line={line}
                   on_delete={ this.props.on_line_delete }
                   on_change={ this.props.on_line_change }
            ></WLine>
        );

        return (
            <div class="d-flex flex-column">
                <Form.Group>
                    <Form.Label>PDF Document to watermark</Form.Label>
                    <Form.Control type="file" onChange={ this.handle_upload }></Form.Control>
                    <Form.Text className="text-muted">
                        The PDF document will not leave your computer.
                    </Form.Text>
                </Form.Group>

                
                <WRepet repets = { this.props.repets }
                        on_change = { this.props.on_repet_change }
                ></WRepet>

                <WRotation rotation = { this.props.rotation }
                           on_change = { this.props.on_rotation_change }
                ></WRotation>

                <div class="d-flex flex-row justify-content-end">
                    <button class="btn btn-link btn-sm" onClick={ this.props.on_line_new }>
                        <small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </small>
                    </button>
                </div>

                <div>
                    {lines}
                </div>

                <Download pdf={ this.props.pdf }></Download>
            </div>
        );
    }
}