import Jimp from 'jimp';
import { PDFDocument, PDFPage } from 'pdf-lib';

function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  }
  

/**
 * Get the bitmap font path for the given fontsize.
 * @param {number} fontsize Font size 
 * @param {boolean} bw Black (true, default) or white (false)?
 */
function get_font_for_fontsize(fontsize, bw=true) {
    const font_base = window.location.href +  "/fonts/"; // TODO: add genericity

    const fonts_b = {
        8: "open-sans-8-black.fnt",
        10: "open-sans-10-black.fnt",
        12: "open-sans-12-black.fnt",
        14: "open-sans-14-black.fnt",
        16: "open-sans-16-black.fnt",
        32: "open-sans-32-black.fnt",
        64: "open-sans-64-black.fnt",
        128: "open-sans-128-black.fnt",
    };

    const fonts_w = {
        8: "open-sans-8-white.fnt",
        10: "open-sans-10-white.fnt",
        12: "open-sans-12-white.fnt",
        14: "open-sans-14-white.fnt",
        16: "open-sans-16-white.fnt",
        32: "open-sans-32-white.fnt",
        64: "open-sans-64-white.fnt",
        128: "open-sans-128-white.fnt",
    };

    if (bw){
        return font_base + fonts_b[fontsize];
    } else {
        return font_base + fonts_w[fontsize];
    }
}


/**
 * Get the height and width of a line
 * @param {} line 
 * @returns 
 */
async function get_line_hbox(line) {
    const font = await Jimp.loadFont(get_font_for_fontsize(line.size));
    
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
 * Get the number of instance and spacing to put between watermark instance from a requested number of instances n.
 * @param {number} w 
 * @param {number} h 
 * @param {number} n 
 * @returns 
 */
function get_repets_spacing(w, h, n) {
    if (n == 1) { // special case that otherwise leads to infinite spacing. Force placement in the middle
        return {
            nx: 1,
            ny: 1,
            dx: w / 2,
            dy: h / 2
        }
    }

    if (n == 2) { // special case that leads to infinite spacing. Force vertical spacing
        return {
            nx: 1,
            ny: 2,
            dx: w / 2,
            dy: h / 3
        }
    }


    // formulae found here: https://math.stackexchange.com/questions/1039482/how-to-evenly-space-a-number-of-points-in-a-rectangle
    const nx = Math.ceil(Math.sqrt(
        ((w / h) * n) +
        (
            Math.pow(w - h, 2) /
            (4 * Math.pow(h, 2))
        ) -
        (
            (w - h) /
            (2 * h)
        )
    ));

    const ny = Math.ceil(n / nx);

    const dx = w / nx;
    const dy = h / ny;

    return {
        nx: nx,
        ny: ny,
        dx: dx,
        dy: dy
    }
}

/**
 * Build an image containing the watermark text
 * @param {*} lines 
 * @returns 
 */
async function img_lines(lines) {
    const hb = await get_lines_hbox(lines);
    var img = new Jimp(hb.width, hb.height, 0x0);
    var y = 0;

    for (const line of lines) {
        const hb_line = await get_line_hbox(line);
        const font = await Jimp.loadFont(get_font_for_fontsize(line.size));

        const x = (hb.width - hb_line.width) / 2

        img.print(font, x, y, {
            text: line.text
        });

        y += hb_line.height;
    }
    
    return img
}


/**
* Draw watermark on the page
 * @param {PDFDocument} pdf 
 * @param {PDFPage} page 
 * @param {*} lines 
 * @param {number} repets 
 * @returns 
 */
async function draw_on_page(pdf, page, lines, repets) {
    const page_width = page.getWidth()
    const page_height = page.getHeight();

    const img = await img_lines(lines);
    const pdf_img = await pdf.embedPng(await img.getBase64Async(Jimp.MIME_PNG));

    const spacing = get_repets_spacing(page_width, page_height, repets);

    for(var nx = 0; nx < spacing.nx; nx++) {
        for(var ny = 0; ny < spacing.ny; ny++) {
            const x = nx * spacing.dx + spacing.dx / 2 + (randn_bm() * spacing.dx / 2);
            const y = ny * spacing.dy + spacing.dy / 2 + (randn_bm() * spacing.dy / 2);

            page.drawImage(pdf_img, {
                x: x - (img.bitmap.width / 2),
                y: y - (img.bitmap.height / 2)
            });
        }
    }

    return page;
}

/**
 * Add watermark to the document following the watermark parameters.
 * @param {PDFDocument} pdf 
 * @param {*} lines 
 * @param {number} repets Number of times to repet the watermark (min 1)  
 * @returns 
 */
export async function watermark_document(pdf, lines, repets) {
    for (var page of pdf.getPages()) {
        await draw_on_page(pdf, page, lines, repets)
    }

    return pdf;
}