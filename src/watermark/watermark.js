import React from "react";
import { Control } from './control.js';

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Display } from "./display.js";
import { Container } from "react-bootstrap";

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
            text: 'Example',
            lines: [
                {text: 'Example'}
            ]
        };

        this.build_default_pdf();

        this.handle_file_upload = this.handle_file_upload.bind(this);
        this.handle_new_line = this.handle_new_line.bind(this);

        this.handle_change_text = this.handle_change_text.bind(this);
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

    handle_new_line() {
        this.setState({
            lines: this.state.lines.concat([{
                text: 'Example'
            }])
        })
    }

    handle_change_text(text) {
        this.setState({
            'text': text
        });
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
                                    on_new_line = { this.handle_new_line }

                                    on_change_text = { this.handle_change_text }
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