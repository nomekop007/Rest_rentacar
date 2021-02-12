const router = require("express").Router();
module.exports = ({ GarantiaController }) => {

    router.post("/registrarGarantia", GarantiaController.createGarantia.bind(GarantiaController));

    return router;
}

