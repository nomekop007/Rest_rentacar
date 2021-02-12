const router = require("express").Router();
module.exports = ({ RolController }) => {

    router.get("/cargarRoles", RolController.getRoles.bind(RolController));

    return router;
}

