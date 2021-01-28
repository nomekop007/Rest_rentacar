const { Reserva, ReservaCliente, ReservaEmpresa, Vehiculo, Cliente, Empresa } = require('../database/db');

class ReservaService {

    async getFindAll() {
        return await Reserva.findAll({
            include: [{ model: Vehiculo }, { model: ReservaCliente, include: [{ model: Cliente }] }, { model: ReservaEmpresa, include: [{ model: Empresa }] }]
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

    async postCreateWithClient(DATA) {
        return await Reserva.create(DATA, {
            include: [ReservaCliente, ReservaEmpresa]
        });
    }

    async deleteDestroy(ID) {
        return await Reserva.destroy({
            where: { id_reserva: ID }
        })
    }

}

module.exports = ReservaService;