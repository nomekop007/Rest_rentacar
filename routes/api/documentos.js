const router = require("express").Router();
const {
    subirDocumentoRequisitosArriendo,
} = require("../middlewares/upload_middleware");
const DocumentoController = require("../../controllers/documento_controller");
const documento = new DocumentoController();

router.post(
    "/registrarRequisitoArriendo",
    subirDocumentoRequisitosArriendo,
    documento.createDocumentoRequisitoArriendo.bind(documento)
);

module.exports = router;