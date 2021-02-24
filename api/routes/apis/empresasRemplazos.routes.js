const router = require("express").Router();
module.exports = ({ EmpresaRemplazoController }) => {

    router.get("/cargarEmpresasRemplazo", EmpresaRemplazoController.getEmpresasRemplazo.bind(EmpresaRemplazoController));

    return router;
}

