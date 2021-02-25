const router = require("express").Router();
module.exports = ({ ArriendoController, subirDocumentoRequisitosArriendo }) => {

    router.post("/registrarRequisitoArriendo/:id", subirDocumentoRequisitosArriendo, ArriendoController.createRequisitoArriendo.bind(ArriendoController));

    return router;
}
