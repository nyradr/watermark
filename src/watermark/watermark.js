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
            'pdf': null,
            'pdf_b64': ''
        };

        this.handle_file_upload = this.handle_file_upload.bind(this);
    }


    async handle_file_upload(file){
        const pdf = await PDFDocument.load(file)
        
        this.setState({
            'pdf': pdf
        });

        this.on_pdf_change();
    }

    async on_pdf_change() {
        const pdf_b64 = await this.state.pdf.saveAsBase64({ dataUri: true });
        
        this.setState({
            'pdf_b64': pdf_b64
        });
    }

    render() {
        return (
            <Container fluid>
                <Control onFileUplad = { this.handle_file_upload } ></Control>
                { this.state.pdf != null &&
                  <Display pdf={ this.state.pdf_b64 }></Display>
                }

                
            </Container>
        );  
    }
}