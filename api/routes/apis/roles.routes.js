const router = require("express").Router();
module.exports = ({ PermisoController }) => {

    router.get("/cargarRoles", PermisoController.getRoles.bind(PermisoController));
    router.post("/registrarRol", PermisoController.createRol.bind(PermisoController));

    return router;
}

