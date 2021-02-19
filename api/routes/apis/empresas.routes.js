const router = require("express").Router();
module.exports = ({ EmpresaController, subirDocumentosEmpresa }) => {

    router.get("/cargarEmpresas", EmpresaController.getEmpresas.bind(EmpresaController));
    router.get("/buscarEmpresa/:id", EmpresaController.findEmpresa.bind(EmpresaController));
    router.post("/registrarEmpresa", EmpresaController.createEmpresa.bind(EmpresaController));
    router.put("/editarEmpresa/:id", EmpresaController.putEmpresa.bind(EmpresaController));
    router.post("/editarArchivos/:id", subirDocumentosEmpresa, EmpresaController.updateFile.bind(EmpresaController));

    return router
}

