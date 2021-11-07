import { getTextWidth } from 'get-text-width';

/**
 * Get the height and width of a line
 * @param {} line 
 * @returns 
 */
function get_line_hbox(line) {
    const h = line.size
    const w = 0.6 * line.text.length * line.size;

    return {
        h: h,
        w: w,
    }
}

function draw_lines(page, x, y, lines, font) {
    const spacing = 5;
    var y_line = y;

    for (const line of lines) {
        const hb = get_line_hbox(line);
        const x_line = x - (hb.w / 2);

        console.log(line);
        console.log(x_line);
        console.log(y_line);
        
        page.drawText(line.text, {
            x: x_line,
            y: y_line,
            font: font,
            size: line.size
        })

        page.drawRectangle({
            x: x_line,
            y: y_line,
            width: hb.w,
            height: hb.h,
            opacity: 0.1,
        })

        y_line = y_line - (hb.h + spacing);
    }
}


/**
 * Draw watermark on the page
 * Righ now the watermark is only pdf text (therefore copyable and easily removable)
 * TODO: Fix this
 *      - Draw on image and merge image with pdf document
 *      - Download the pdf as an image or immutable pdf
 */
function draw_on_page(page, lines, font) {
    console.log(lines);

    draw_lines(page, 200, 800, lines, font);
}

export function watermark_document(pdf, lines, font) {
    for (var page of pdf.getPages()) {
        draw_on_page(page, lines, font)
    }

    return pdf;
}