class ReservaService {

    constructor({ ReservaBusiness }) {
        this._reservaBusiness = ReservaBusiness;
    }

    async getReservasBySucursal(id_sucursal) {
        return await this._reservaBusiness.getReservasBySucursal(id_sucursal);
    }

    async findReserva(id_reserva) {
        return await this._reservaBusiness.findReserva(id_reserva);
    }

    async createReserva(reserva) {
        return await this._reservaBusiness.createReserva(reserva);
    }

    async updateReserva(reserva, id_reserva) {
        return await this._reservaBusiness.updateReserva(reserva, id_reserva);
    }

    async deleteReserva(id_reserva) {
        return await this._reservaBusiness.deleteReserva(id_reserva);
    }

    async createReservaYCliente(payload) {
        return await this._reservaBusiness.createReservaYCliente(payload);
    }


}

module.exports = ReservaService;