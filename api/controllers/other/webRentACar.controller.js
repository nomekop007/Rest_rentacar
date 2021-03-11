const sendError = require('../../../helpers/sendError');

class WebRentACarController {

    constructor({ VehiculoService, ReservaService }) {
        this._vehiculoService = VehiculoService;
        this._reservaService = ReservaService;
    }

    async createReservaYCliente(req, res) {
        try {
            const payload = {
                titulo_reserva: 'RESERVA WEB',
                descripcion_reserva: 'RESERVA GENERADA A TRAVES DE LA PAGINA WEB RENT A CAR , CONTACTAR CLIENTE',
                color_reserva: '#5311ee',
                inicio_reserva: req.body.fechaInicio,
                fin_reserva: req.body.fechaFin,
                patente_vehiculo: req.body.patenteVehiculo,
                nombre_cliente: req.body.nombreCliente,
                telefono_cliente: req.body.telefonoCliente,
                correo_cliente: req.body.correoCliente
            };
            const response = await this._reservaService.createReservaYCliente(payload);
            res.json(response)
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async vehiculosDisponibles(req, res) {
        try {
            const vehiculosRepo = await this._vehiculoService.getVehiculosDisponibles();
            const vehiculos = vehiculosRepo.map((vehiculo) => {
                return {
                    patente: vehiculo.patente_vehiculo,
                    transmision: vehiculo.transmision_vehiculo,
                    marca: vehiculo.marca_vehiculo,
                    modelo: vehiculo.modelo_vehiculo,
                    color: vehiculo.color_vehiculo,
                    'año': vehiculo['año_vehiculo'],
                    url_image: `${process.env.PATH_SERVER}/${vehiculo.foto_vehiculo}`,
                    sucursal: vehiculo.sucursale ? vehiculo.sucursale.nombre_sucursal : null
                }
            }).filter((vehiculo) => (vehiculo.sucursal != null))
            res.json({ success: true, data: { vehiculos: vehiculos } })
        } catch (error) {
            sendError(error, req, res);
        }
    }
}

module.exports = WebRentACarController;