const router = require("express").Router();
module.exports = ({ PropietarioController }) => {

    router.get("/cargarPropietarios", PropietarioController.getPropietario.bind(PropietarioController));

    return router;
}

