const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../uploads/fotosVehiculos"),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    },
});

const subirImageVehiculo = multer({
    storage: storage,
    dest: path.join(__dirname, "../../uploads/fotosVehiculos"),
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
    destination: path.join(
        __dirname,
        "../../uploads/documentos/requisitosArriendo"
    ),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    },
});

const subirDocumentoRequisitosArriendo = multer({
    storage: storage2,
    dest: path.join(__dirname, "../../uploads/documentos/requisitosArriendo"),
    limits: { fieldSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|pdf/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen valida");
    },
}).fields([
    { name: "fotoCarnetFrontal", maxCount: 1 },
    { name: "fotoCarnetTrasera", maxCount: 1 },
    { name: "fotoLicenciaFrontal", maxCount: 1 },
    { name: "fotoLicenciaTrasera", maxCount: 1 },
    { name: "fotoTargeta", maxCount: 1 },
    { name: "fotoCheque", maxCount: 1 },
    { name: "fotoComprobante", maxCount: 1 },
]);

module.exports = {
    subirImageVehiculo: subirImageVehiculo,
    subirDocumentoRequisitosArriendo: subirDocumentoRequisitosArriendo,
};