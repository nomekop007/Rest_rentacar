class ReservaBusiness {

    constructor({ ReservaRepository }) {
        this._reservaRepository = ReservaRepository;
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


}

module.exports = ReservaBusiness;