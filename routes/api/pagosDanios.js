const router = require("express").Router();
const PagoDanioController = require("../../controllers/pagoDanio.controller");
const { subirDocumentoFacturacion } = require("../../middlewares/upload.middleware")
const pagoDanio = new PagoDanioController();

router.post("/registrarPagoDanio", pagoDanio.createPagoDanio.bind(pagoDanio));

router.post("/guardarComprobantePagoDanio/:id", subirDocumentoFacturacion, pagoDanio.uploadComprobante.bind(pagoDanio));

module.exports = router;