const router = require("express").Router();

const check = require("./middlewares/check_middleware");
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
const apiDocumentosRouter = require("./api/documentos");

router.use("/defaultValues", defaultValues);
router.use("/usuarios", apiUsuariosRouter);
router.use("/documentos", apiDocumentosRouter);
router.use("/pdf", check.checkToken, pdfRouter);
router.use("/roles", check.checkToken, apiRolesRouter);
router.use("/vehiculos", check.checkToken, apiVehiculosRouter);
router.use("/sucursales", check.checkToken, apiSucursalesRouter);
router.use("/accesorios", check.checkToken, apiAccesoriosRouter);
router.use("/arriendos", check.checkToken, apiArriendosRouter);
router.use("/clientes", check.checkToken, apiClientesRouter);
router.use("/empresas", check.checkToken, apiEmpresasRouter);
router.use("/conductores", check.checkToken, apiConductoresRouter);
router.use("/pagosArriendos", check.checkToken, apiPagosArriendosRouter);

module.exports = router;