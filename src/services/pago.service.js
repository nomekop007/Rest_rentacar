const { Pago, PagoArriendo } = require("../database/db");
const { Op } = require("sequelize");

class PagoService {

    async postCreate(DATA) {
        return await Pago.create(DATA);
    }


    async putUpdate(DATA, ID) {
        return await Pago.update(DATA, {
            where: { id_pago: ID },
        });
    }


    async getFindAll(WHERE) {
        return Pago.findAll({
            where: WHERE,
            include: { model: PagoArriendo }
        });
    }

    async getFindAllById(WHERE) {
        return Pago.findAll({
            where: {
                [Op.or]: WHERE
            }
        })
    }


    async getFindOne(ID) {
        return await Pago.findOne({
            where: { id_pago: ID },
            include: { model: PagoArriendo }
        })
    }

}

module.exports = PagoService;