class ReservaBusiness {

    constructor({ ReservaRepository, VehiculoRepository }) {
        this._reservaRepository = ReservaRepository;
        this._vehiculoRepository = VehiculoRepository;
    }

    async getReservasBySucursal(id_sucursal) {
        const reservas = await this._reservaRepository.getFindAll(id_sucursal);
        return reservas;
    }


    async findReserva(id_reserva) {
        const reserva = await this._reservaRepository.getFindOne(id_reserva);
        return reserva;
    }

    async createReserva(reserva) {
        const reservaRepo = await this._reservaRepository.postCreateWithClient(reserva);
        return reservaRepo;
    }


    async updateReserva(reserva, id_reserva) {
        await this._reservaRepository.putUpdate(reserva, id_reserva);
        return true;
    }

    async deleteReserva(id_reserva) {
        await this._reservaRepository.deleteDestroy(id_reserva);
        return true;
    }

    async createReservaYCliente(payload) {

        const vehiculo = await this._vehiculoRepository.getFindOne(payload.patente_vehiculo)
        const reservaData = {
            titulo_reserva: payload.titulo_reserva,
            descripcion_reserva: payload.descripcion_reserva,
            color_reserva: payload.color_reserva,
            inicio_reserva: payload.inicio_reserva,
            fin_reserva: payload.fin_reserva,
            userAt: "CLIENTE",
            patente_vehiculo: payload.patente_vehiculo,
            id_sucursal: vehiculo.id_sucursal,
            reservasClientesWeb: {
                nombre_reservaClienteWeb: payload.nombre_cliente,
                telefono_reservaClienteWeb: payload.telefono_cliente,
                correo_reservaClienteWeb: payload.correo_cliente,

            }
        }
        const reservaRepo = await this._reservaRepository.postCreateWithClient(reservaData);

        // enviar correo a jefa sucursal



        return reservaRepo;
    }


}

module.exports = ReservaBusiness;