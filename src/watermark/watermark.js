import React from "react";
import { Control } from './control.js';

import { PDFDocument } from 'pdf-lib';
import { Display } from "./display.js";
import { watermark_document } from "./pdf.js";

const default_line = {
    id: 0,
    text: 'Example',
    size: 16
};

/**
 * Upload the pdf file
 * Set the text to be writen on it
 * Write the pdf and download it
 */
export class Watermark extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            pdf: null,
            pdf_original: '',
            pdf_b64: '',
            repets: 10,
            rotation: 45,
            lines_id: 1,
            lines: [{
                id: default_line.id,
                text: default_line.text,
                size: default_line.size
            }]
        };

        this.build_default_pdf();

        this.handle_file_upload = this.handle_file_upload.bind(this);
        this.handle_repet_change = this.handle_repet_change.bind(this);
        this.handle_rotation_change = this.handle_rotation_change.bind(this);

        this.handle_line_new = this.handle_line_new.bind(this);
        this.handle_line_delete = this.handle_line_delete.bind(this);
        this.handle_line_change = this.handle_line_change.bind(this);
    }

    /**
     * Build a by default pdf to show the watermarks
     */
    async build_default_pdf() {
        const pdf = await PDFDocument.create()

        this.setState({
            pdf: pdf,
            pdf_original: await pdf.saveAsBase64({ dataUri: true })
        }, () => {
            this.on_pdf_change();
        });


        
    }


    /**
     * Is called when a pdf file is uploaded by the user
     * @param {*} file 
     */
    async handle_file_upload(file){
        const pdf = await PDFDocument.load(file)
        const pdf_original = await pdf.saveAsBase64({ dataUri: true });

        this.setState({
            pdf: pdf,
            pdf_original: pdf_original
        }, () => {
            this.on_pdf_change();
        });
    }

    handle_repet_change(repets) {
        this.setState({
            repets: repets
        }, () => {
            this.on_pdf_change();
        });
    }

    handle_rotation_change(rotation) {
        this.setState({
            rotation: rotation
        }, () => {
            this.on_pdf_change();
        });
    }

    /**
     * Handle the control callback asking to create a new line
     */
    handle_line_new() {
        const lines_id = this.state.lines_id +1;
        var line = default_line;
        line.id = lines_id;

        const lines = this.state.lines.concat([{
            id: lines_id,
            text: default_line.text,
            size: default_line.size
        }]);

        this.setState({
            lines_id: lines_id,
            lines: lines
        }, () => {
            this.on_pdf_change();
        });
    }

    /**
     * Handle the control callback asking to delete a line
     */
    handle_line_delete(id) {
        const lines = this.state.lines.filter(line => line.id !== id);

        if (lines.length === 0) {
            this.setState({
                lines: [{
                    id: default_line.id,
                    text: default_line.text,
                    size: default_line.size
                }]
            }, () => {
                this.on_pdf_change();
            });
        } else {
            this.setState({
                lines: lines
            }, () => {
                this.on_pdf_change();
            })
        }
    }

    /** Handle the change in a line parameter */
    handle_line_change(id, text, size){
        this.setState({
            lines: this.state.lines.map(line => {
                if (line.id === id){
                    return {
                        id: id,
                        text: text,
                        size: size
                    }
                } else {
                    return line
                }
            })
        }, () => {
            this.on_pdf_change();
        })
    }

    /**
     * To call every time the pdf state value is changed (makes the rendering)
     */
    async on_pdf_change() {
        if (this.state.pdf != null) {
            var pdf = await PDFDocument.load(this.state.pdf_original);
            
            await watermark_document(pdf, this.state.lines, this.state.repets, this.state.rotation);

            const pdf_b64 = await pdf.saveAsBase64({ dataUri: true });
        
            this.setState({
                'pdf_b64': pdf_b64
            });
        } else {
            this.setState({
                'pdf_b64': ''
            });
        }   
    }

    render() {
        return (
            <div class="vw-100 vh-100 bg-light">
                <div class="row h-100">
                    <div class="col-md-3 h-100">
                        <div class="m-2">
                           <Control lines = { this.state.lines }
                                    repets = { this.state.repets }
                                    rotation = { this.state.rotation }
                                    pdf = { this.state.pdf_b64 }
                                    
                                    on_file_uplad = { this.handle_file_upload }
                                    on_repet_change = { this.handle_repet_change }
                                    on_rotation_change = { this.handle_rotation_change }
                                    on_line_new = { this.handle_line_new }
                                    on_line_delete = { this.handle_line_delete }
                                    on_line_change = { this.handle_line_change }
                            ></Control>
                        </div>                        
                    </div>
                    <div class="col-md-9 h-100">
                        { this.state.pdf != null &&
                        <Display pdf={ this.state.pdf_b64 }></Display>
                        }
                    </div>
                </div>
            </div>
        );  
    }
}