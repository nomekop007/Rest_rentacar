const router = require("express").Router();
module.exports = ({ PagoDanioController }) => {

    router.post("/registrarPagoDanio", PagoDanioController.createPagoDanio.bind(PagoDanioController));

    return router;
}


