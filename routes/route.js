const router = require("express").Router();

const middlewares = require("./middlewares");
const defaultValues = require("./defaultValues");
const apiVehiculosRouter = require("./api/vehiculos");
const apiUsuariosRouter = require("./api/usuarios");
const apiSucursalesRouter = require("./api/sucursales");
const apiAccesoriosRouter = require("./api/accesorios");
const apiArriendosRouter = require("./api/arriendos");

router.use("/defaultValues", defaultValues);
router.use("/usuarios", apiUsuariosRouter);
router.use("/vehiculos", middlewares.checkToken, apiVehiculosRouter);
router.use("/sucursales", middlewares.checkToken, apiSucursalesRouter);
router.use("/accesorios", middlewares.checkToken, apiAccesoriosRouter);
router.use("/arriendos", middlewares.checkToken, apiArriendosRouter);

module.exports = router;