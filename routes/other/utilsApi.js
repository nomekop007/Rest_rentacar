const router = require("express").Router();

const UtilsComponent = require("../../components/utils_component");
const utils = new UtilsComponent();

router.post("/buscarDocumento", utils.findDocumento.bind(utils));

module.exports = router;
