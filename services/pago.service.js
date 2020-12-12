const { Pago, PagoArriendo } = require("../database/db");

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


    async getFindOne(ID) {
        return await Pago.findOne({
            where: { id_pago: ID },
            include: { model: PagoArriendo }
        })
    }

}

module.exports = PagoService;