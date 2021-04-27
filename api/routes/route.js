
const { Router } = require("express");

module.exports = ({
    AccesorioRoutes, ArriendoRoutes, ClienteRoutes, DespachoRoutes, EmpresaRemplazoRoutes,
    PagoRoutes, PropietarioRoutes, ReservaRoutes, SucursalRoutes, UsuarioRoutes,
    VehiculoRoutes, checkMiddleware, checkApiMiddleware, PermisoRoutes, LicitacionRoutes, logMiddleware,
    DefaultValuesRoutes, ApiUtilsRoutes, ApiFinanzasRoutes, WebRentACarRoutes
}) => {

    const router = Router();
    const apiRoute = Router();


    if (process.env.DEFAULT_VALUE === "TRUE") {
        console.log("function default enable");
        apiRoute.use("/defaultValues", DefaultValuesRoutes);
    }

    apiRoute.use("/accesorios", checkMiddleware.checkToken, AccesorioRoutes);
    apiRoute.use("/arriendos", checkMiddleware.checkToken, ArriendoRoutes);
    apiRoute.use("/clientes", checkMiddleware.checkToken, ClienteRoutes);
    apiRoute.use("/despachos", checkMiddleware.checkToken, DespachoRoutes);
    apiRoute.use("/empresasRemplazo", checkMiddleware.checkToken, EmpresaRemplazoRoutes);
    apiRoute.use("/pagos", checkMiddleware.checkToken, PagoRoutes);
    apiRoute.use("/propietarios", checkMiddleware.checkToken, PropietarioRoutes);
    apiRoute.use("/reservas", checkMiddleware.checkToken, ReservaRoutes);
    apiRoute.use("/permisos", checkMiddleware.checkToken, PermisoRoutes);
    apiRoute.use("/sucursales", checkMiddleware.checkToken, SucursalRoutes);
    apiRoute.use("/vehiculos", checkMiddleware.checkToken, VehiculoRoutes);
    apiRoute.use("/usuarios", UsuarioRoutes);
    apiRoute.use("/utils", checkMiddleware.checkToken, ApiUtilsRoutes);

    // rutas a otros sistemas
    apiRoute.use("/licitacion", checkApiMiddleware.checkTokenApiRest, LicitacionRoutes);
    apiRoute.use("/api", checkApiMiddleware.checkTokenApiRest, ApiFinanzasRoutes);
    apiRoute.use("/web", /* checkApiMiddleware.checkTokenApiRest,  */WebRentACarRoutes);


    //ruta padre
    router.use("/rentacar", apiRoute, logMiddleware.logRegister);

    return router;
}


