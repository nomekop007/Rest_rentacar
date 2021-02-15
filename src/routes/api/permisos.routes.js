const router = require("express").Router();
module.exports = ({ PermisoController }) => {

    router.get("/mostrarPermisosPorRol/:id", PermisoController.mostrarPermisosPorRol.bind(PermisoController));

    return router;
}