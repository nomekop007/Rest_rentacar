const router = require("express").Router();
module.exports = ({ SucursalController }) => {

    router.get("/cargarRegiones", SucursalController.getRegiones.bind(SucursalController));

    return router
}

