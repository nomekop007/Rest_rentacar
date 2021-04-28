const router = require("express").Router();
module.exports = ({ EmpresaRemplazoController }) => {

    router.get("/cargarEmpresasRemplazo", EmpresaRemplazoController.getEmpresasRemplazo.bind(EmpresaRemplazoController));

    router.post("/registrarRemplazo", EmpresaRemplazoController.createRemplazo.bind(EmpresaRemplazoController));
    router.post("/crearTarifaEmpresaReemplazo", EmpresaRemplazoController.createTarifaEmpresaReemplazo.bind(EmpresaRemplazoController));
    router.get("/getAllTarifasEmpresaReemplazo", EmpresaRemplazoController.getAllTarifasEmpresasRemplazo.bind(EmpresaRemplazoController));

    router.get("/getAllTarifasPorEmpresa/:id", EmpresaRemplazoController.getAllTarifasPorEmpresa.bind(EmpresaRemplazoController));
    router.put("/updateTarifasPorEmpresa/:id", EmpresaRemplazoController.updateTarifasEmpresaReemplazo.bind(EmpresaRemplazoController));
    router.post("/obtenerTarifasEmpresaSucursal", EmpresaRemplazoController.getAllPorEmpresaSucursal.bind(EmpresaRemplazoController));

    return router;
}

