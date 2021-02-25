
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const nodemailer = require("nodemailer");

//  fonts pdf
const fontsPDF = {
    Roboto: {
        normal: require.resolve("../utils/fonts/Roboto-Regular.ttf"),
        bold: require.resolve("../utils/fonts/Roboto-Medium.ttf"),
        italics: require.resolve("../utils/fonts/Roboto-Italic.ttf"),
        bolditalics: require.resolve("../utils/fonts/Roboto-MediumItalic.ttf"),
    },
};

//datos del email hosting with nodemailer
const nodemailerTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: false },
});


module.exports = { nodemailerTransporter, fontsPDF };