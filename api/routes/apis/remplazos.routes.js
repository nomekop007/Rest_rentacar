const router = require("express").Router();
module.exports = ({ EmpresaRemplazoController }) => {

    router.post("/registrarRemplazo", EmpresaRemplazoController.createRemplazo.bind(EmpresaRemplazoController));

    return router;
}

