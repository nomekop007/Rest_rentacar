const router = require("express").Router();
const EmpresaController = require("../../controllers/empresa.controller");
const empresa = new EmpresaController();

router.get("/cargarEmpresas", empresa.getEmpresas.bind(empresa));

router.get("/buscarEmpresa/:id", empresa.findEmpresa.bind(empresa));

router.post("/registrarEmpresa", empresa.createEmpresa.bind(empresa));

router.put("/editarEmpresa/:id", empresa.putEmpresa.bind(empresa));

module.exports = router;