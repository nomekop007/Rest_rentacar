const router = require("express").Router();

const middlewares = require("./middlewares");
const defaultValues = require("./defaultValues");
const apiVehiculosRouter = require("./api/vehiculos");
const apiUsuariosRouter = require("./api/usuarios");
const apiSucursalesRouter = require("./api/sucursales");

router.use("/loadDefaultValues", defaultValues);
router.use("/usuarios", apiUsuariosRouter);
router.use("/vehiculos", middlewares.checkToken, apiVehiculosRouter);
router.use("/sucursales", middlewares.checkToken, apiSucursalesRouter);

module.exports = router;