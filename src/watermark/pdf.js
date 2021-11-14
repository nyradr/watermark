import { getTextWidth } from 'get-text-width';

/**
 * Get the height and width of a line
 * @param {} line 
 * @returns 
 */
function get_line_hbox(line) {
    const height = line.size
    const width = 0.6 * line.text.length * line.size;

    return {
        height: height,
        width: width,
    }
}

/**
 * Get the hbox used by a set of lines
 * @param {*} lines 
 * @returns 
 */
function get_lines_hbox(lines) {
    var height = 0;
    var width = 0;
    var uplift = null;

    for (const line of lines) {
        const hb = get_line_hbox(line);

        if (hb.width > width) {
            width = hb.width;
        }

        height += hb.height;

        if (uplift == null) {
            uplift = hb.height * 0.25;
        }
    }

    return {
        height: height,
        width: width,
        uplift: uplift
    }
}

function draw_lines(page, x, y, lines, font) {
    const spacing = 5;

    var prev_hbox = {
        height: 0,
        width: 0
    }
    var y_line = y;

    for (const line of lines) {
        const hb = get_line_hbox(line);
        const x_line = x - (hb.width / 2);
        y_line = y_line - (prev_hbox.height / 2) - (hb.height / 2);
        
        page.drawText(line.text, {
            x: x_line,
            y: y_line,
            font: font,
            size: line.size
        })

        prev_hbox = hb;
    }

    const hb = get_lines_hbox(lines);
    console.log(hb)

    page.drawRectangle({
        x: x - (hb.width / 2),
        y: y - hb.height + hb.uplift,
        width: hb.width,
        height: hb.height,
        opacity: 0.1,
    });
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

    const page_width = page.getWidth()
    const page_height = page.getHeight();

    draw_lines(page, page_width / 2, page_height / 2, lines, font);
}

export function watermark_document(pdf, lines, font) {
    for (var page of pdf.getPages()) {
        draw_on_page(page, lines, font)
    }

    return pdf;
}