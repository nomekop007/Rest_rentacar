const router = require("express").Router();
module.exports = ({
    AccesorioRoutes, ContratoRoutes, ContactoRoutes, AbonoRoutes,
    ConductorRoutes, ActaEntregaRoutes, ArriendoRoutes, ClienteRoutes,
    DanioVehiculoRoutes, DespachoRoutes, EmpresaRemplazoRoutes, EmpresaRoutes,
    ExtencionRoutes, FacturacionRoutes, GarantiaRoutes, PagoRoutes, PagoAccesorioRoutes,
    PagoArriendoRoutes, PagoDanioRoutes, PropietarioRoutes, RegionRoutes, RemplazoRoutes,
    RequisitoRoutes, ReservaRoutes, RolRoutes, SucursalRoutes, TarifaVehiculoRoutes,
    UsuarioRoutes, VehiculoRoutes, checkMiddleware, checkApiMiddleware, ApiFinanzasRoutes,
    DefaultValuesRoutes, ApiUtilsRoutes
}) => {
    if (process.env.DEFAULT_VALUE === "TRUE") {
        console.log("function default enable");
        router.use("/defaultValues", DefaultValuesRoutes);
    }

    router.use("/abonos", checkMiddleware.checkToken, AbonoRoutes);
    router.use("/accesorios", checkMiddleware.checkToken, AccesorioRoutes);
    router.use("/actasEntregas", checkMiddleware.checkToken, ActaEntregaRoutes);
    router.use("/arriendos", checkMiddleware.checkToken, ArriendoRoutes);
    router.use("/clientes", checkMiddleware.checkToken, ClienteRoutes);
    router.use("/conductores", checkMiddleware.checkToken, ConductorRoutes);
    router.use("/contactos", checkMiddleware.checkToken, ContactoRoutes)
    router.use("/contratos", checkMiddleware.checkToken, ContratoRoutes);
    router.use("/danioVehiculos", checkMiddleware.checkToken, DanioVehiculoRoutes);
    router.use("/despachos", checkMiddleware.checkToken, DespachoRoutes);
    router.use("/empresas", checkMiddleware.checkToken, EmpresaRoutes);
    router.use("/empresasRemplazo", checkMiddleware.checkToken, EmpresaRemplazoRoutes);
    router.use("/extenciones", checkMiddleware.checkToken, ExtencionRoutes);
    router.use("/facturaciones", checkMiddleware.checkToken, FacturacionRoutes);
    router.use("/garantias", checkMiddleware.checkToken, GarantiaRoutes);
    router.use("/pagos", checkMiddleware.checkToken, PagoRoutes);
    router.use("/pagosAccesorios", checkMiddleware.checkToken, PagoAccesorioRoutes);
    router.use("/pagosArriendos", checkMiddleware.checkToken, PagoArriendoRoutes);
    router.use("/pagosDanios", checkMiddleware.checkToken, PagoDanioRoutes);
    router.use("/propietarios", checkMiddleware.checkToken, PropietarioRoutes);
    router.use("/regiones", checkMiddleware.checkToken, RegionRoutes);
    router.use("/remplazos", checkMiddleware.checkToken, RemplazoRoutes);
    router.use("/requisitos", checkMiddleware.checkToken, RequisitoRoutes);
    router.use("/reservas", checkMiddleware.checkToken, ReservaRoutes);
    router.use("/roles", checkMiddleware.checkToken, RolRoutes);
    router.use("/sucursales", checkMiddleware.checkToken, SucursalRoutes);
    router.use("/tarifasVehiculos", checkMiddleware.checkToken, TarifaVehiculoRoutes);
    router.use("/vehiculos", checkMiddleware.checkToken, VehiculoRoutes);
    router.use("/usuarios", UsuarioRoutes);
    router.use("/api", checkApiMiddleware.checkTokenApiRest, ApiFinanzasRoutes);
    router.use("/utils", checkMiddleware.checkToken, ApiUtilsRoutes);

    return router;
}


