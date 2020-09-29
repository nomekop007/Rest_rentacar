const router = require("express").Router();
const {
    subirDocumentoRequisitosArriendo,
} = require("../middlewares/upload_middleware");
const RequisitoController = require("../../controllers/requisito_controller");
const requisito = new RequisitoController();

router.post(
    "/registrarRequisitoArriendo/:id",
    subirDocumentoRequisitosArriendo,
    requisito.createRequisitoArriendo.bind(requisito)
);

module.exports = router;