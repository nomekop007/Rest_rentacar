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

module.exports = {
    subirImageVehiculo: subirImageVehiculo,
};