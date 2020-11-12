const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads/fotosVehiculos"),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    },
});

const subirImageVehiculo = multer({
    storage: storage,
    dest: path.join(__dirname, "../uploads/fotosVehiculos"),
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

const storage2 = multer.diskStorage({
    destination: path.join(__dirname, "../uploads/documentos/requisitosArriendo"),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    },
});

const subirDocumentoRequisitosArriendo = multer({
    storage: storage2,
    dest: path.join(__dirname, "../uploads/documentos/requisitosArriendo"),
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



const storage3 = multer.diskStorage({
    destination: path.join(__dirname, "../uploads/documentos/facturaciones"),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    },
});

const subirDocumentoFacturacion = multer({
    storage: storage3,
    dest: path.join(__dirname, "../uploads/documentos/facturaciones"),
    limits: { fieldSize: 20000000 },
}).single("documento_facturacion");


module.exports = {
    subirImageVehiculo: subirImageVehiculo,
    subirDocumentoRequisitosArriendo: subirDocumentoRequisitosArriendo,
    subirDocumentoFacturacion: subirDocumentoFacturacion
};