const router = require("express").Router();


//apis
const apiRolesRouter = require("./api/roles.routes");
const apiVehiculosRouter = require("./api/vehiculos.routes");
const apiUsuariosRouter = require("./api/usuarios.routes");
const apiSucursalesRouter = require("./api/sucursales.routes");
const apiAccesoriosRouter = require("./api/accesorios.routes");
const apiArriendosRouter = require("./api/arriendos.routes");
const apiClientesRouter = require("./api/clientes.routes");
const apiEmpresasRouter = require("./api/empresas.routes");
const apiConductoresRouter = require("./api/conductores.routes");
const apiRequisitosRouter = require("./api/requisitos.routes");
const apiPagoArriendoRouter = require("./api/pagosArriendos.routes");
const apiGarantiasRouter = require("./api/garantias.routes");
const apiContratosRouter = require("./api/contratos.routes");
const apiPropietarioRouter = require("./api/propietarios.routes");
const apiRemplazoRouter = require("./api/remplazos.routes");
const apiActaEntregaRouter = require("./api/actasEntregas.routes");
const apiDespachoRouter = require("./api//despachos.routes");
const apiPagoAccesorioRouter = require("./api/pagosAccesorios.routes");
const apiFacturacionRouter = require("./api/facturaciones.routes");
const apiEmpresaRemplazoRouter = require("./api/empresasRemplazos.routes");
const apiPagoRouter = require("./api/pagos.routes");
const apiContactoRouter = require("./api/contactos.routes");
const apiRegionRouter = require("./api/regiones.routes");
const apiDanioVehiculoRouter = require("./api/danioVehiculos.routes");
const apiPagoDanioRouter = require("./api/pagosDanios.routes");
const apiTarifaVehiculoRouter = require("./api/tarifasVehiculos.routes");
const apiReservaRouter = require("./api/reservas.routes");

//otros 
const finanzasApiRouter = require("./other/finanzasApi.routes");
const defaultValuesRouter = require("./other/defaultValues.routes");
const utilsApiRouter = require("./other/utilsApi.routes");


//middlewares
const check = require("../middlewares/check.middleware");
const check_api = require("../middlewares/checkApi.middleware");


if (process.env.DEFAULT_VALUE === "TRUE") {
    console.log("function default enable");
    router.use("/defaultValues", defaultValuesRouter);
}


// router para la api de finanzas
router.use("/api", check_api.checkTokenApiRest, finanzasApiRouter);
// endpoint api
router.use("/utils", check.checkToken, utilsApiRouter);
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
router.use("/pagosArriendos", check.checkToken, apiPagoArriendoRouter);
router.use("/garantias", check.checkToken, apiGarantiasRouter);
router.use("/arriendos", check.checkToken, apiArriendosRouter);
router.use("/remplazos", check.checkToken, apiRemplazoRouter);
router.use("/actasEntregas", apiActaEntregaRouter);
router.use("/despachos", check.checkToken, apiDespachoRouter);
router.use("/pagosAccesorios", check.checkToken, apiPagoAccesorioRouter);
router.use("/facturaciones", check.checkToken, apiFacturacionRouter);
router.use("/empresasRemplazo", check.checkToken, apiEmpresaRemplazoRouter);
router.use("/contactos", check.checkToken, apiContactoRouter)
router.use("/pagos", check.checkToken, apiPagoRouter);
router.use("/regiones", check.checkToken, apiRegionRouter);
router.use("/danioVehiculos", check.checkToken, apiDanioVehiculoRouter);
router.use("/pagosDanios", check.checkToken, apiPagoDanioRouter);
router.use("/tarifasVehiculos", check.checkToken, apiTarifaVehiculoRouter);
router.use("/reservas", check.checkToken, apiReservaRouter);
router.use("/usuarios", apiUsuariosRouter);


module.exports = router;