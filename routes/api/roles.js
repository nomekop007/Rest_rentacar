const router = require("express").Router();
const RolController = require("../../controllers/rol.controller");
const rol = new RolController();

router.get("/cargarRoles", rol.getRoles.bind(rol));

module.exports = router;
