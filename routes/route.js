const router = require("express").Router();

const middlewares = require("./middlewares");
const defaultValues = require("./defaultValues");
const pdfRouter = require("./api/pdfs");
const apiRolesRouter = require("./api/roles");
const apiVehiculosRouter = require("./api/vehiculos");
const apiUsuariosRouter = require("./api/usuarios");
const apiSucursalesRouter = require("./api/sucursales");
const apiAccesoriosRouter = require("./api/accesorios");
const apiArriendosRouter = require("./api/arriendos");
const apiClientesRouter = require("./api/clientes");
const apiEmpresasRouter = require("./api/empresas");
const apiConductoresRouter = require("./api/conductores");
const apiPagosArriendosRouter = require("./api/pagosArriendos");

router.use("/defaultValues", defaultValues);
router.use("/usuarios", apiUsuariosRouter);
router.use("/pdf", middlewares.checkToken, pdfRouter);
router.use("/roles", middlewares.checkToken, apiRolesRouter);
router.use("/vehiculos", middlewares.checkToken, apiVehiculosRouter);
router.use("/sucursales", middlewares.checkToken, apiSucursalesRouter);
router.use("/accesorios", middlewares.checkToken, apiAccesoriosRouter);
router.use("/arriendos", middlewares.checkToken, apiArriendosRouter);
router.use("/clientes", middlewares.checkToken, apiClientesRouter);
router.use("/empresas", middlewares.checkToken, apiEmpresasRouter);
router.use("/conductores", middlewares.checkToken, apiConductoresRouter);
router.use("/pagosArriendos", middlewares.checkToken, apiPagosArriendosRouter);

module.exports = router;