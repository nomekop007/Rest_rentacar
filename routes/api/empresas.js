const router = require("express").Router();
const EmpresaController = require("../../controllers/empresa_controller");
const empresa = new EmpresaController();

router.get("/cargarEmpresas", empresa.getEmpresas.bind(empresa));

router.get("/buscarEmpresa/:id", empresa.findEmpresa.bind(empresa));

module.exports = router;
