const router = require("express").Router();
module.exports = ({ EmpresaRemplazoController }) => {

    router.get("/cargarEmpresasRemplazo", EmpresaRemplazoController.getEmpresasRemplazo.bind(EmpresaRemplazoController));

    router.post("/registrarRemplazo", EmpresaRemplazoController.createRemplazo.bind(EmpresaRemplazoController));

    router.post("/crearTarifaEmpresaReemplazo", EmpresaRemplazoController.createTarifaEmpresaReemplazo.bind(EmpresaRemplazoController));

    return router;
}

