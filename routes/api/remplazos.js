const router = require("express").Router();
const RemplazoController = require("../../controllers/remplazo.controller");
const remplazo = new RemplazoController();

router.post("/registrarRemplazo", remplazo.createRemplazo.bind(remplazo));

module.exports = router;