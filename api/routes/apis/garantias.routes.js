const router = require("express").Router();
module.exports = ({ ArriendoController }) => {

    router.post("/registrarGarantia", ArriendoController.createGarantia.bind(ArriendoController));

    return router;
}

