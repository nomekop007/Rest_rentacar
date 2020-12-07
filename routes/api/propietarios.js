const router = require("express").Router();
const PropietarioController = require("../../controllers/propietario.controller");
const propietario = new PropietarioController();

router.get("/cargarPropietarios", propietario.getPropietario.bind(propietario));

module.exports = router;