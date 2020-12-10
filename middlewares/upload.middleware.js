const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


//se crean las carpetas automaticas
multer({ dest: path.join(__dirname, process.env.PATH_DANIO_VEHICULO) });
multer({ dest: path.join(__dirname, process.env.PATH_ACTA_ENTREGA) });
multer({ dest: path.join(__dirname, process.env.PATH_CONTRATO) });
multer({ dest: path.join(__dirname, process.env.PATH_RECEPCIONES) });





const subirDocumentoRequisitosArriendo = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
    limits: { fieldSize: 20000000 },
}).fields([
    { name: "inputlicenciaFrontal", maxCount: 1 },
    { name: "inputlicenciaTrasera", maxCount: 1 },
    { name: "inputCarnetFrontal", maxCount: 1 },
    { name: "inputCarnetTrasera", maxCount: 1 },
    { name: "inputCheque", maxCount: 1 },
    { name: "inputComprobante", maxCount: 1 },
    { name: "inputTarjeta", maxCount: 1 },
    { name: "inputCartaRemplazo", maxCount: 1 },
    { name: "inputBoletaEfectivo", maxCount: 1 },
]);





const subirImageVehiculo = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_FOTO_VEHICULO),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FOTO_VEHICULO),
    limits: { fieldSize: 20000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen valida");
    },
}).single("foto_vehiculo");




const subirDocumentoFacturacion = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_FACTURACIONES),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FACTURACIONES),
    limits: { fieldSize: 20000000 },
}).single("documento_facturacion");




module.exports = {
    subirImageVehiculo: subirImageVehiculo,
    subirDocumentoRequisitosArriendo: subirDocumentoRequisitosArriendo,
    subirDocumentoFacturacion: subirDocumentoFacturacion,
};