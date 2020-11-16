const router = require("express").Router();
const EmpresaRemplazoController = require("../../controllers/empresaRemplazo_controller");
const empresaRemplazo = new EmpresaRemplazoController();

router.get("/cargarEmpresasRemplazo", empresaRemplazo.getEmpresasRemplazo.bind(empresaRemplazo));


module.exports = router;