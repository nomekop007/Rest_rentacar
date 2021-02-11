const router = require("express").Router();
module.exports = ({ RegionController }) => {

    router.get("/cargarRegiones", RegionController.getRegiones.bind(RegionController));

    return router
}

