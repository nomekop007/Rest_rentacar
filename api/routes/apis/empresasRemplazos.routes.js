const router = require("express").Router();
module.exports = ({ EmpresaRemplazoController }) => {

    router.get("/cargarEmpresasRemplazo", EmpresaRemplazoController.getEmpresasRemplazo.bind(EmpresaRemplazoController));

    router.post("/registrarRemplazo", EmpresaRemplazoController.createRemplazo.bind(EmpresaRemplazoController));

    return router;
}

