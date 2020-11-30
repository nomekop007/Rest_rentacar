const router = require("express").Router();

//middlewares
const check = require("../middlewares/check_middleware");
const check_api = require("../middlewares/checkApi_middleware");

//otros routes
const defaultValues = require("./defaultValues");
const apiFinanzasRouter = require("./finanzasApi");


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
const apiPagoArriendoRouter = require("./api/pagosArriendos");
const apiGarantiasRouter = require("./api/garantias");
const apiContratosRouter = require("./api/contratos");
const apiPropietarioRouter = require("./api/propietarios");
const apiRemplazoRouter = require("./api/remplazos");
const apiActaEntregaRouter = require("./api/actasEntregas");
const apiDespachoRouter = require("./api//despachos");
const apiPagoAccesorioRouter = require("./api/pagosAccesorios");
const apiFacturacionRouter = require("./api/facturaciones");
const apiEmpresaRemplazoRouter = require("./api/empresasRemplazos");
const apiPagoRouter = require("./api/pagos");
const apiContactoRouter = require("./api/contactos");
const apiRegionRouter = require("./api/regiones");
const apiDanioVehiculoRouter = require("./api/danioVehiculos");



if (process.env.DEFAULT_VALUE === "TRUE") {
    console.log("function default enable");
    router.use("/defaultValues", defaultValues);
}
// router para la api de finanzas
router.use("/api", check_api.checkTokenApiRest, apiFinanzasRouter);


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
router.use("/pagosArriendos", apiPagoArriendoRouter);
router.use("/garantias", check.checkToken, apiGarantiasRouter);
router.use("/arriendos", check.checkToken, apiArriendosRouter);
router.use("/remplazos", check.checkToken, apiRemplazoRouter);
router.use("/actasEntregas", check.checkToken, apiActaEntregaRouter);
router.use("/despachos", check.checkToken, apiDespachoRouter);
router.use("/pagosAccesorios", check.checkToken, apiPagoAccesorioRouter);
router.use("/facturaciones", check.checkToken, apiFacturacionRouter);
router.use("/empresasRemplazo", check.checkToken, apiEmpresaRemplazoRouter);
router.use("/contactos", check.checkToken, apiContactoRouter)
router.use("/pagos", check.checkToken, apiPagoRouter);
router.use("/regiones", check.checkToken, apiRegionRouter);
router.use("/danioVehiculos", check.checkToken, apiDanioVehiculoRouter);


module.exports = router;