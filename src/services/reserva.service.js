const { Reserva, Cliente, Vehiculo } = require('../database/db');

class ReservaService {

    async getFindAll() {
        return await Reserva.findAll({
            include: [{ model: Vehiculo }, { model: Cliente }]
        });
    }

    async getFindOne(ID) {
        return await Reserva.findByPk(ID);
    }


    async putUpdate(DATA, ID) {
        return await Reserva.update(DATA, {
            where: { id_reserva: ID }
        })
    }

    async postCreate(DATA) {
        return await Reserva.create(DATA);
    }

    async deleteDestroy(ID) {
        return await Reserva.destroy({
            where: { id_reserva: ID }
        })
    }

}

module.exports = ReservaService;