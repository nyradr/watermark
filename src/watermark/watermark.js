import React from "react";
import { Control } from './control.js';

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Display } from "./display.js";
import { Container } from "react-bootstrap";

const default_lines = [
    {
        id: 0,
        text: 'Example'
    }
];

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
            pdf_b64: '',
            lines_id: 1,
            lines: default_lines
        };

        this.build_default_pdf();

        this.handle_file_upload = this.handle_file_upload.bind(this);
        this.handle_line_new = this.handle_line_new.bind(this);
        this.handle_line_delete = this.handle_line_delete.bind(this);
        this.handle_line_change = this.handle_line_change.bind(this);
    }

    /**
     * Build a by default pdf to show the watermarks
     */
    async build_default_pdf() {
        const pdf = await PDFDocument.create()

        const page = pdf.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30
        

        const pdfBytes = await pdf.save()
        this.setState({
            pdf: pdf,
        });

        this.on_pdf_change();
    }


    /**
     * Is called when a pdf file is uploaded by the user
     * @param {*} file 
     */
    async handle_file_upload(file){
        const pdf = await PDFDocument.load(file)
        
        this.setState({
            'pdf': pdf
        });

        this.on_pdf_change();
    }

    /**
     * Handle the control callback asking to create a new line
     */
    handle_line_new() {
        this.setState({
            lines_id: this.state.lines_id +1,
            lines: this.state.lines.concat(default_lines)
        });

        this.on_pdf_change();
    }

    /**
     * Handle the control callback asking to delete a line
     */
    handle_line_delete(id) {
        const lines = this.state.lines.filter(line => line.id != id);

        if (lines.length == 0) {
            this.setState({
                lines: default_lines
            });
        } else {
            this.setState({
                lines: lines
            })
        }
        
        this.on_pdf_change()
    }

    /** Handle the change in a line parameter */
    handle_line_change(id, text){
        this.setState({
            lines: this.state.lines.map(line => {
                if (line.id == id){
                    return {
                        id: id,
                        text: text
                    }
                } else {
                    return line
                }
            })
        })

        this.on_pdf_change()
    }

    /**
     * To call every time the pdf state value is changed (makes the rendering)
     */
    async on_pdf_change() {
        if (this.state.pdf != null) {
            const pdf_b64 = await this.state.pdf.saveAsBase64({ dataUri: true });
        
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
                                    on_file_uplad = { this.handle_file_upload }
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