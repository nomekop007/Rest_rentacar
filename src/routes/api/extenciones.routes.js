const router = require("express").Router();
module.exports = ({ ExtencionController }) => {

    router.get("/buscarExtencionesPorArriendo/:id", ExtencionController.buscarExtencionesPorArriendo.bind(ExtencionController));
    router.post("/registrarExtencion", ExtencionController.createExtencionArriendo.bind(ExtencionController));

    return router;
}

