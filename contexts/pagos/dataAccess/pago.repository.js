
const { Op } = require("sequelize");

class PagoRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.pago.create(DATA);
    }


    putUpdate(DATA, ID) {
        return this._db.pago.update(DATA, {
            where: { id_pago: ID },
        });
    }


    getFindAll(WHERE) {
        return this._db.pago.findAll({
            where: WHERE,
            include: [
                { model: this._db.pagoArriendo, include: { model: this._db.arriendo } },
                { model: this._db.abono }
            ]
        });
    }

    getFindAllById(WHERE) {
        return this._db.pago.findAll({
            where: {
                [Op.or]: WHERE
            }
        })
    }


    getFindOne(ID) {
        return this._db.pago.findOne({
            where: { id_pago: ID },
            include: [
                { model: this._db.pagoArriendo, include: { model: this._db.arriendo } },
                { model: this._db.facturacion, include: { model: this._db.modoPago } },
                { model: this._db.abono, include: { model: this._db.facturacion, include: { model: this._db.modoPago } } }
            ]
        })
    }


    getFindAllByArriendo(ID) {
        return this._db.pago.findAll({
            include: [{ model: this._db.pagoArriendo, where: { id_arriendo: ID } }]
        })
    }



}

module.exports = PagoRepository;