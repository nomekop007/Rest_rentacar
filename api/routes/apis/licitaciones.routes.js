const router = require("express").Router();
module.exports = ({ LicitacionController, subirFotoRespaldoIngresoLicitacion }) => {

    router.get("/cargarLicitaciones", LicitacionController.getLicitaciones.bind(LicitacionController));
    router.get("/cargarIngresos", LicitacionController.getIngresosLicitaciones.bind(LicitacionController));
    router.post("/crearIngreso", LicitacionController.createIngresoLicitacion.bind(LicitacionController));
    router.post("/subirRespaldo", subirFotoRespaldoIngresoLicitacion, LicitacionController.uploadRespaldoIngresoLicitacion.bind(LicitacionController));

    return router;
}


