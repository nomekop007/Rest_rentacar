const router = require("express").Router();

const UtilsComponent = require("../../components/utils.component");
const utils = new UtilsComponent();

router.post("/buscarDocumento", utils.findDocumento.bind(utils));

router.delete("/reiniciarVistaFirma/:id", utils.rollbackVistaFirma.bind(utils));

router.delete("/reiniciarVistaPago/:id", utils.rollbackVistaPago.bind(utils));

router.delete("/reiniciarVistaRequisito/:id", utils.rollbackVistaRequisito.bind(utils));



module.exports = router;
