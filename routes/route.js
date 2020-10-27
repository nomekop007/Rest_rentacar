const router = require("express").Router();

//middlewares
const check = require("./middlewares/check_middleware");
const log = require("./middlewares/log_middleware");

//default routes
const defaultValues = require("./defaultValues");

//routes
const apiRolesRouter = require("./api/roles");
const apiVehiculosRouter = require("./api/vehiculos");
const apiUsuariosRouter = require("./api/usuarios");
const apiSucursalesRouter = require("./api/sucursales");
const apiAccesoriosRouter = require("./api/accesorios");
const apiArriendosRouter = require("./api/arriendos");
const apiClientesRouter = require("./api/clientes");
const apiEmpresasRouter = require("./api/empresas");
const apiConductoresRouter = require("./api/conductores");
const apiRequisitosRouter = require("./api/requisitos");
const apiPagosRouter = require("./api/pagos");
const apiGarantiasRouter = require("./api/garantias");
const apiContratosRouter = require("./api/contratos");
const apiPropietarioRouter = require("./api/propietarios");
const apiRemplazoRouter = require("./api/remplazos");
const apiActaEntregaRouter = require("./api/actasEntregas");
const apiDespachoRouter = require("./api//despachos");

if (process.env.DEFAULT_VALUE === "TRUE") {
    console.log("function default enable");
    router.use("/defaultValues", defaultValues);
}

router.use("/usuarios", apiUsuariosRouter);
router.use(
    "/requisitos",
    check.checkToken,
    apiRequisitosRouter,
    log.logRegister
);
router.use(
    "/propietarios",
    check.checkToken,
    apiPropietarioRouter,
    log.logRegister
);
router.use("/roles", check.checkToken, apiRolesRouter, log.logRegister);
router.use("/vehiculos", check.checkToken, apiVehiculosRouter, log.logRegister);
router.use(
    "/sucursales",
    check.checkToken,
    apiSucursalesRouter,
    log.logRegister
);
router.use(
    "/accesorios",
    check.checkToken,
    apiAccesoriosRouter,
    log.logRegister
);
router.use("/clientes", check.checkToken, apiClientesRouter, log.logRegister);
router.use("/empresas", check.checkToken, apiEmpresasRouter, log.logRegister);
router.use(
    "/conductores",
    check.checkToken,
    apiConductoresRouter,
    log.logRegister
);
router.use("/contratos", check.checkToken, apiContratosRouter, log.logRegister);
router.use("/pagos", check.checkToken, apiPagosRouter, log.logRegister);
router.use("/garantias", check.checkToken, apiGarantiasRouter, log.logRegister);
router.use("/arriendos", check.checkToken, apiArriendosRouter, log.logRegister);
router.use("/remplazos", check.checkToken, apiRemplazoRouter, log.logRegister);
router.use(
    "/actasEntregas",
    check.checkToken,
    apiActaEntregaRouter,
    log.logRegister
);
router.use("/despachos", check.checkToken, apiDespachoRouter, log.logRegister);

module.exports = router;