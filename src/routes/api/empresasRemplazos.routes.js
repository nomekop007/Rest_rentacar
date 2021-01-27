const router = require("express").Router();
const EmpresaRemplazoController = require("../../controllers/empresaRemplazo.controller");
const empresaRemplazo = new EmpresaRemplazoController();

router.get("/cargarEmpresasRemplazo", empresaRemplazo.getEmpresasRemplazo.bind(empresaRemplazo));


module.exports = router;