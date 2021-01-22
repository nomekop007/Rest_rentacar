const router = require("express").Router();
const PagoDanioController = require("../../controllers/pagoDanio.controller");
const pagoDanio = new PagoDanioController();

router.post("/registrarPagoDanio", pagoDanio.createPagoDanio.bind(pagoDanio));

module.exports = router;