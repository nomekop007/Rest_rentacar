
const { Router } = require("express");

module.exports = ({
    AccesorioRoutes, ContratoRoutes, ContactoRoutes, AbonoRoutes,
    ConductorRoutes, ActaEntregaRoutes, ArriendoRoutes, ClienteRoutes,
    DanioVehiculoRoutes, DespachoRoutes, EmpresaRemplazoRoutes, EmpresaRoutes,
    ExtencionRoutes, FacturacionRoutes, GarantiaRoutes, PagoRoutes, PagoAccesorioRoutes,
    PagoArriendoRoutes, PagoDanioRoutes, PropietarioRoutes, RegionRoutes, RemplazoRoutes,
    RequisitoRoutes, ReservaRoutes, RolRoutes, SucursalRoutes, TarifaVehiculoRoutes,
    UsuarioRoutes, VehiculoRoutes, checkMiddleware, checkApiMiddleware, PermisoRoutes,
    logMiddleware, DefaultValuesRoutes, ApiUtilsRoutes, ApiFinanzasRoutes, WebRentACarRoutes
}) => {

    const router = Router();
    const apiRoute = Router();


    if (process.env.DEFAULT_VALUE === "TRUE") {
        console.log("function default enable");
        apiRoute.use("/defaultValues", DefaultValuesRoutes);
    }

    apiRoute.use("/abonos", checkMiddleware.checkToken, AbonoRoutes);
    apiRoute.use("/accesorios", checkMiddleware.checkToken, AccesorioRoutes);
    apiRoute.use("/actasEntregas", checkMiddleware.checkToken, ActaEntregaRoutes);
    apiRoute.use("/arriendos", checkMiddleware.checkToken, ArriendoRoutes);
    apiRoute.use("/clientes", checkMiddleware.checkToken, ClienteRoutes);
    apiRoute.use("/conductores", checkMiddleware.checkToken, ConductorRoutes);
    apiRoute.use("/contactos", checkMiddleware.checkToken, ContactoRoutes)
    apiRoute.use("/contratos", checkMiddleware.checkToken, ContratoRoutes);
    apiRoute.use("/danioVehiculos", checkMiddleware.checkToken, DanioVehiculoRoutes);
    apiRoute.use("/despachos", checkMiddleware.checkToken, DespachoRoutes);
    apiRoute.use("/empresas", checkMiddleware.checkToken, EmpresaRoutes);
    apiRoute.use("/empresasRemplazo", checkMiddleware.checkToken, EmpresaRemplazoRoutes);
    apiRoute.use("/extenciones", checkMiddleware.checkToken, ExtencionRoutes);
    apiRoute.use("/facturaciones", checkMiddleware.checkToken, FacturacionRoutes);
    apiRoute.use("/garantias", checkMiddleware.checkToken, GarantiaRoutes);
    apiRoute.use("/pagos", checkMiddleware.checkToken, PagoRoutes);
    apiRoute.use("/pagosAccesorios", checkMiddleware.checkToken, PagoAccesorioRoutes);
    apiRoute.use("/pagosArriendos", checkMiddleware.checkToken, PagoArriendoRoutes);
    apiRoute.use("/pagosDanios", checkMiddleware.checkToken, PagoDanioRoutes);
    apiRoute.use("/propietarios", checkMiddleware.checkToken, PropietarioRoutes);
    apiRoute.use("/regiones", checkMiddleware.checkToken, RegionRoutes);
    apiRoute.use("/remplazos", checkMiddleware.checkToken, RemplazoRoutes);
    apiRoute.use("/requisitos", checkMiddleware.checkToken, RequisitoRoutes);
    apiRoute.use("/reservas", checkMiddleware.checkToken, ReservaRoutes);
    apiRoute.use("/roles", checkMiddleware.checkToken, RolRoutes);
    apiRoute.use("/permisos", checkMiddleware.checkToken, PermisoRoutes);
    apiRoute.use("/sucursales", checkMiddleware.checkToken, SucursalRoutes);
    apiRoute.use("/tarifasVehiculos", checkMiddleware.checkToken, TarifaVehiculoRoutes);
    apiRoute.use("/vehiculos", checkMiddleware.checkToken, VehiculoRoutes);
    apiRoute.use("/usuarios", UsuarioRoutes);
    apiRoute.use("/utils", checkMiddleware.checkToken, ApiUtilsRoutes);

    // rutas a otros sistemas
    apiRoute.use("/api", checkApiMiddleware.checkTokenApiRest, ApiFinanzasRoutes);
    apiRoute.use("/web", /* checkApiMiddleware.checkTokenApiRest,  */WebRentACarRoutes);


    //ruta padre
    router.use("/rentacar", apiRoute, logMiddleware.logRegister);

    return router;
}


