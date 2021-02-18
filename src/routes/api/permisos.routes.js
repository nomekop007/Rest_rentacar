const router = require("express").Router();
module.exports = ({ PermisoController }) => {

    router.get("/mostrarPermisosPorRol/:id", PermisoController.mostrarPermisosPorRol.bind(PermisoController));
    router.get("/cargarPermisos", PermisoController.cargarPermisos.bind(PermisoController));
    router.get("/buscarPermiso/:id", PermisoController.buscarPermiso.bind(PermisoController));
    router.put("/modificarPermiso/:id", PermisoController.modificarPermiso.bind(PermisoController));
    router.post("/registrarPermiso", PermisoController.registrarPermiso.bind(PermisoController));
    router.post("/crearRolPermiso", PermisoController.agregarRolPermiso.bind(PermisoController));
    router.delete("/eliminarRolPermiso/:id", PermisoController.eliminarRolPermiso.bind(PermisoController));
    router.get("/validarPermisos/:id", PermisoController.validarPermisos.bind(PermisoController));


    return router;
}