import React from 'react';
import { Download } from './download';
import { WLine } from './wline';
import { UploadPDF } from './wuploadpdf';
import { WSlider } from './wslider';

/**
 * Control panel to upload the pdf, set the parameter and download the result
 */
export class Control extends React.Component {

    render() {
        const lines = this.props.lines.map((line) =>             
            <WLine line={line}
                   on_delete={ this.props.on_line_delete }
                   on_change={ this.props.on_line_change }
            ></WLine>
        );

        return (
            <div class="d-flex flex-column p-3 w-100">
                <UploadPDF on_file_upload={ this.props.on_file_upload }></UploadPDF>
                
                <WSlider value = { this.props.repets }
                         on_change = { this.props.on_repet_change }
                         min="1" max="42" step="1"
                         text="Number of repetitions"
                         help_title="Repetitions"
                         help_content="
                            Number of times to repet the watermark per document pages.
                            The watermark will be evenly distributed on the page.
                         "
                ></WSlider>

                <WSlider value = { this.props.rotation }
                         on_change = { this.props.on_rotation_change }
                         min="0" max="359" step="1"
                         text="Watermark rotation"
                         help_title="Rotation"
                         help_content="
                            Image rotation in degrese.
                            0 degree means the watermark will be horizontally aligned from left to right.
                            180 degree means the watermark will be horizontally aligned from rigt to left (with downward text).
                         "
                ></WSlider>

                <WSlider value = { this.props.opacity }
                         on_change = { this.props.on_opacity_change }
                         min="1" max="100" step="1"
                         text="Watermark opacity"
                         help_title="Opacity"
                         help_content="
                            Change the watermark opacity.
                            100 means the watermark will be totally opac and 0 means the watermark will be totally transparent.
                         "
                ></WSlider>

                <div class="d-flex flex-row justify-content-end">
                    <small class="text-primary" role="button" onClick={ this.props.on_line_new }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </small>
                </div>

                <div>
                    {lines}
                </div>

                <Download pdf={ this.props.pdf }></Download>
            </div>
        );
    }
}