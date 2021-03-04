class WebRentACarController {

    constructor({ sendError, VehiculoService, ReservaService }) {
        this._vehiculoService = VehiculoService;
        this._reservaService = ReservaService;
        this.sendError = sendError;
    }

    async createReservaYCliente(req, res) {
        try {
            const payload = {
                titulo_reserva: "RESERVA CLIENTE WEB RENT A CAR",
                descripcion_reserva: "",
                inicio_reserva: req.body.fechaInicio,
                fin_reserva: req.body.fechaFin,
                color_reserva: "#5311ee",
                patente_vehiculo: req.body.patenteVehiculo,
                nombre_sucursal: req.body.nombreSucursal,
                rut_cliente: req.body.rutCliente,
                nombre_cliente: req.body.nombreCliente,
                telefono_cliente: req.body.telefonoCliente,
                correo_cliente: req.body.correoCliente
            };
            const response = await this._reservaService.createReservaYCliente(payload);
            res.json({ success: true, data: response })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async vehiculosDisponibles(req, res) {
        try {
            const vehiculos = await this._vehiculoService.getVehiculosDisponibles();
            res.json({ success: true, data: vehiculos })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }
}

module.exports = WebRentACarController;