const router = require("express").Router();

const middlewares = require("./middlewares");
const apiVehiculosRouter = require("./api/vehiculos");
const apiUsuariosRouter = require("./api/usuarios");
const apiSucursalesRouter = require("./api/sucursales");

//se valida con middlewares.checkToken,
router.use("/vehiculos", apiVehiculosRouter);
router.use("/usuarios", apiUsuariosRouter);
router.use("/sucursales", apiSucursalesRouter);

module.exports = router;
