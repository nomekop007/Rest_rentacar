const moment = require("moment");
const jwt = require("jwt-simple");
const fs = require("fs");
const path = require("path");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const sendError = (error, res) => {
    console.log(error);
    res.status(310).json({
        success: false,
        msg: "Server error 310",
    });
};

const crearToken = (usuario) => {
    const payload = {
        usuarioId: usuario.id_usuario,
        createAt: moment().unix(),
        expiredAt: moment().add(12, "hours").unix(),
    };
    return jwt.encode(payload, process.env.SECRET_PHRASE);
};

const fecha = () => {
    let f = new Date();
    return moment(f).format("DD-MM-YYYY");
};

const hora = () => {
    let f = new Date();
    return moment(f).format("HH:mm:ss a");
};

const fechahorafirma = () => {
    let f = new Date();
    return moment(f).format("DD-MM-YYYY HH:mm a");
};

const formatFecha = (fecha) => {
    let f = new Date(fecha);
    return moment(f).format("DD-MM-YYYY");
};

const formatFechahora = (fecha) => {
    var f = new Date(fecha);
    return moment(f).format("DD-MM-YYYY  HH:mm a");
};

const borrarImagenDeStorage = (name) => {
    try {
        fs.unlinkSync(path.join(__dirname, "../uploads/fotosVehiculos/" + name));
        return true;
    } catch (err) {
        return console.log(err);
    }
};


const ordenarArrayporFecha = (array) => {

    return array.sort(function (a, b) {
        const fechaA = new Date(a.createdAt);
        const fechaB = new Date(b.createdAt);

        if (fechaA > fechaB) {
            return 1;
        }
        if (fechaA < fechaB) {
            return -1;
        }
        return 0;
    });

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fontsPDF = {
    Roboto: {
        normal: require.resolve("../utils/fonts/Roboto-Regular.ttf"),
        bold: require.resolve("../utils/fonts/Roboto-Medium.ttf"),
        italics: require.resolve("../utils/fonts/Roboto-Italic.ttf"),
        bolditalics: require.resolve("../utils/fonts/Roboto-MediumItalic.ttf"),
    },
};

module.exports = {
    sendError,
    crearToken,
    fecha,
    hora,
    fechahorafirma,
    formatFecha,
    formatFechahora,
    borrarImagenDeStorage,
    ordenarArrayporFecha,
    getRandomInt,
    fontsPDF,
};