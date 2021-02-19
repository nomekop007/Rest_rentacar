const router = require("express").Router();
module.exports = ({ RequisitoController, subirDocumentoRequisitosArriendo }) => {

    router.post("/registrarRequisitoArriendo/:id", subirDocumentoRequisitosArriendo, RequisitoController.createRequisitoArriendo.bind(RequisitoController));

    return router;
}
