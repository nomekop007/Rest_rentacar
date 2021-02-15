const router = require("express").Router();
module.exports = ({ RolController }) => {

    router.get("/cargarRoles", RolController.getRoles.bind(RolController));
    router.post("/registrarRol", RolController.createRol.bind(RolController));

    return router;
}

