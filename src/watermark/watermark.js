import React from "react";
import { Control } from './control.js';

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Display } from "./display.js";
import { Container } from "react-bootstrap";
import { watermark_document } from "./pdf.js";

const default_line = {
    id: 0,
    text: 'Example',
    size: 24
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
            lines_id: 1,
            lines: [{
                id: default_line.id,
                text: default_line.text,
                size: default_line.size
            }]
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
        this.setState({
            pdf: pdf,
            pdf_original: await pdf.saveAsBase64({ dataUri: true })
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
            pdf: pdf,
            pdf_original: await this.state.pdf.saveAsBase64({ dataUri: true })
        });

        this.on_pdf_change();
    }

    /**
     * Handle the control callback asking to create a new line
     */
    handle_line_new() {
        const lines_id = this.state.lines_id +1;
        var line = default_line;
        line.id = lines_id;

        console.log("EE")
        console.log(this.state.lines);
        const lines = this.state.lines.concat([{
            id: lines_id,
            text: default_line.text,
            size: default_line.size
        }]);
        console.log(lines)

        this.setState({
            lines_id: lines_id,
            lines: lines
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
                lines: [{
                    id: default_line.id,
                    text: default_line.text,
                    size: default_line.size
                }]
            });
        } else {
            this.setState({
                lines: lines
            })
        }
        
        this.on_pdf_change()
    }

    /** Handle the change in a line parameter */
    handle_line_change(id, text, size){
        this.setState({
            lines: this.state.lines.map(line => {
                if (line.id == id){
                    return {
                        id: id,
                        text: text,
                        size: size
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
            var pdf = await PDFDocument.load(this.state.pdf_original);
            
            const default_font = await pdf.embedFont(StandardFonts.Courier);  // Note: always use monospace fonts (for size computation)
            pdf = watermark_document(pdf, this.state.lines, default_font);

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