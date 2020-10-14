const router = require("express").Router();

const check = require("./middlewares/check_middleware");
const defaultValues = require("./defaultValues");

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

if (process.env.DEFAULT_VALUE === "TRUE") {
    console.log("function default enable");
    router.use("/defaultValues", defaultValues);
}

router.use("/usuarios", apiUsuariosRouter);
router.use("/requisitos", check.checkToken, apiRequisitosRouter);
router.use("/propietarios", check.checkToken, apiPropietarioRouter);
router.use("/roles", check.checkToken, apiRolesRouter);
router.use("/vehiculos", check.checkToken, apiVehiculosRouter);
router.use("/sucursales", check.checkToken, apiSucursalesRouter);
router.use("/accesorios", check.checkToken, apiAccesoriosRouter);
router.use("/clientes", check.checkToken, apiClientesRouter);
router.use("/empresas", check.checkToken, apiEmpresasRouter);
router.use("/conductores", check.checkToken, apiConductoresRouter);
router.use("/contratos", check.checkToken, apiContratosRouter);
router.use("/pagos", check.checkToken, apiPagosRouter);
router.use("/garantias", check.checkToken, apiGarantiasRouter);
router.use("/arriendos", check.checkToken, apiArriendosRouter);

module.exports = router;