const router = require("express").Router();
const { subirDocumentosEmpresa } = require("../../middlewares/upload.middleware");

const EmpresaController = require("../../controllers/empresa.controller");
const empresa = new EmpresaController();

router.get("/cargarEmpresas", empresa.getEmpresas.bind(empresa));

router.get("/buscarEmpresa/:id", empresa.findEmpresa.bind(empresa));

router.post("/registrarEmpresa", empresa.createEmpresa.bind(empresa));

router.put("/editarEmpresa/:id", empresa.putEmpresa.bind(empresa));

router.post("/editarArchivos/:id", subirDocumentosEmpresa, empresa.updateFile.bind(empresa));


module.exports = router;