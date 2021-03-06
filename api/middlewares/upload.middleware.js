const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


//se crean las carpetas automaticas
multer({ dest: path.join(__dirname, process.env.PATH_DANIO_VEHICULO) });
multer({ dest: path.join(__dirname, process.env.PATH_ACTA_ENTREGA) });
multer({ dest: path.join(__dirname, process.env.PATH_RECEPCIONES) });
multer({ dest: path.join(__dirname, process.env.PATH_ACTA_TRASLADO_ORIGEN) });
multer({ dest: path.join(__dirname, process.env.PATH_ACTA_TRASLADO_DESTINO) });




const subirFotosActaTrasladoOrigen = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_FOTO_TRASLADO_ORIGEN),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FOTO_TRASLADO_ORIGEN),
    limits: { fieldSize: 30000000 },
}).fields([
    { name: "file0", maxCount: 1 },
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "file5", maxCount: 1 },
    { name: "file6", maxCount: 1 },
    { name: "file7", maxCount: 1 },
    { name: "file8", maxCount: 1 },
    { name: "file9", maxCount: 1 },
    { name: "file10", maxCount: 1 },
]);

const subirFotosActaTrasladoDestino = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_FOTO_TRASLADO_DESTINO),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FOTO_TRASLADO_DESTINO),
    limits: { fieldSize: 30000000 },
}).fields([
    { name: "file0", maxCount: 1 },
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "file5", maxCount: 1 },
    { name: "file6", maxCount: 1 },
    { name: "file7", maxCount: 1 },
    { name: "file8", maxCount: 1 },
    { name: "file9", maxCount: 1 },
    { name: "file10", maxCount: 1 },
]);








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
    { name: "inputEstatuto", maxCount: 1 },
    { name: "inputRol", maxCount: 1 },
    { name: "inputVigencia", maxCount: 1 },
    { name: "inputCarpetaTributaria", maxCount: 1 },
    { name: "inputCartaAutorizacion", maxCount: 1 },
]);


const subirFotosDespacho = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_FOTO_DESPACHOS),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FOTO_DESPACHOS),
    limits: { fieldSize: 20000000 },
}).fields([
    { name: "file0", maxCount: 1 },
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "file5", maxCount: 1 },
    { name: "file6", maxCount: 1 },
    { name: "file7", maxCount: 1 },
    { name: "file8", maxCount: 1 },
    { name: "file9", maxCount: 1 },
    { name: "file10", maxCount: 1 },
]);




const subirFotosRecepcion = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_FOTO_RECEPCION),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FOTO_RECEPCION),
    limits: { fieldSize: 20000000 },
}).single("inputFotoVehiculo");




const subirFotoRespaldoIngresoLicitacion = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_RESPALDO_INGRESO_LICITACION),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FOTO_RECEPCION),
    limits: { fieldSize: 20000000 },
}).single("respaldo");


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
}).single("inputFoto");




const subirDocumentoFacturacion = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_FACTURACIONES),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_FACTURACIONES),
    limits: { fieldSize: 20000000 },
}).single("inputDocumento");



const subirDocumentoContrato = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_CONTRATO),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_CONTRATO),
    limits: { fieldSize: 20000000 },
}).single("inputContrato");




const subirDocumentosCliente = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
    limits: { fieldSize: 20000000 },
}).fields([
    { name: "inputCarnetTraseraCliente", maxCount: 1 },
    { name: "inputCarnetFrontalCliente", maxCount: 1 },
]);



const subirDocumentosEmpresa = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
    limits: { fieldSize: 20000000 },
}).fields([
    { name: "inputCarnetFrontalEmpresa", maxCount: 1 },
    { name: "inputCarnetTraseraEmpresa", maxCount: 1 },
    { name: "inputDocumentotRol", maxCount: 1 },
    { name: "inputEstatuto", maxCount: 1 },
    { name: "inputDocumentoVigencia", maxCount: 1 },
]);



const subirDocumentosConductor = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        },
    }),
    dest: path.join(__dirname, process.env.PATH_REQUISITO_ARRIENDO),
    limits: { fieldSize: 20000000 },
}).fields([
    { name: "inputlicenciaFrontalConductor", maxCount: 1 },
    { name: "inputlicenciaTraseraConductor", maxCount: 1 },
]);


module.exports = {
    subirFotosActaTrasladoDestino: subirFotosActaTrasladoDestino,
    subirFotosActaTrasladoOrigen: subirFotosActaTrasladoOrigen,
    subirImageVehiculo: subirImageVehiculo,
    subirDocumentoRequisitosArriendo: subirDocumentoRequisitosArriendo,
    subirDocumentoFacturacion: subirDocumentoFacturacion,
    subirDocumentoContrato: subirDocumentoContrato,
    subirDocumentosCliente: subirDocumentosCliente,
    subirDocumentosEmpresa: subirDocumentosEmpresa,
    subirDocumentosConductor: subirDocumentosConductor,
    subirFotosDespacho: subirFotosDespacho,
    subirFotosRecepcion: subirFotosRecepcion,
    subirFotoRespaldoIngresoLicitacion: subirFotoRespaldoIngresoLicitacion
};