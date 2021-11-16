import Jimp from 'jimp';

/**
 * Get the height and width of a line
 * @param {} line 
 * @returns 
 */
async function get_line_hbox(line) {
    const font = await Jimp.loadFont(window.location.href + "/fonts/open-sans-16-black.fnt");
    
    const height = Jimp.measureTextHeight(font, line.text, 100);
    const width = Jimp.measureText(font, line.text);

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
async function get_lines_hbox(lines) {
    var height = 0;
    var width = 0;

    for (const line of lines) {
        const hb = await get_line_hbox(line);

        if (hb.width > width) {
            width = hb.width;
        }

        height += hb.height;
    }

    return {
        height: height,
        width: width
    }
}

/**
 * Build an image containing the watermark text
 * @param {*} lines 
 * @returns 
 */
async function img_lines(lines) {
    const hb = await get_lines_hbox(lines);
    
    var img = new Jimp(hb.width, hb.height, 0xAAAAAA); //TODO: Set a transparent background (colored for debug)
    
    const font = await Jimp.loadFont(window.location.href + "/fonts/open-sans-16-black.fnt");
    
    var y = 0;

    for (const line of lines) {
        const hb_line = await get_line_hbox(line);

        const x = (hb.width - hb_line.width) / 2

        img.print(font, x, y, {
            text: line.text
        });

        y += hb_line.height;
    }
    
    const img_b64 = await img.getBase64Async(Jimp.MIME_PNG);
    return img_b64
}


/**
 * Draw watermark on the page
 * Righ now the watermark is only pdf text (therefore copyable and easily removable)
 * TODO: Fix this
 *      - Draw on image and merge image with pdf document
 *      - Download the pdf as an image or immutable pdf
 */
async function draw_on_page(pdf, page, lines) {
    console.log(lines);

    const page_width = page.getWidth()
    const page_height = page.getHeight();

    const img = await img_lines(lines);

    const pdf_img = await pdf.embedPng(img);

    page.drawImage(pdf_img, {
        x: page_width / 2,
        y: page_height * 0.75
    })

    return page;
}

/**
 * Add watermark to the document following the watermark parameters.
 * @param {*} pdf 
 * @param {*} lines 
 * @returns 
 */
export async function watermark_document(pdf, lines) {
    for (var page of pdf.getPages()) {
        await draw_on_page(pdf, page, lines)
    }

    return pdf;
}