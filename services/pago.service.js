const { Pago, PagoArriendo, Arriendo, Abono, Facturacion, ModoPago } = require("../config/database/db");
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
            include: [
                { model: PagoArriendo, include: { model: Arriendo } },
                { model: Abono }
            ]
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
            include: [
                { model: PagoArriendo, include: { model: Arriendo } },
                { model: Facturacion, include: { model: ModoPago } },
                { model: Abono, include: { model: Facturacion, include: { model: ModoPago } } }
            ]
        })
    }


    async getFindAllByArriendo(ID) {
        return await Pago.findAll({
            include: [{ model: PagoArriendo, where: { id_arriendo: ID } }]
        })
    }



}

module.exports = PagoService;