const BaseRepository = require("../../base/dataAccess/base.repository");


class ExtencionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "extencion");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.extencion.create(DATA);
    }

    findOne(ID) {
        return this._db.extencion.findOne({
            where: { id_extencion: ID },
            include: [{
                model: this._db.pagoArriendo,
                include: [
                    { model: this._db.pagoAccesorio, include: { model: this._db.accesorio } },
                    { model: this._db.pago, include: { model: this._db.facturacion, include: { model: this._db.modoPago } } }
                ]
            },
            { model: this._db.vehiculo }, { model: this._db.contrato }]
        })
    }

    getFindAllWithArrindo(ID) {
        return this._db.extencion.findAll({
            where: { id_arriendo: ID }
        });
    }

    putUpdateById(DATA, ID) {
        return this._db.extencion.update(DATA, {
            where: { id_extencion: ID },
        });
    }

}

module.exports = ExtencionRepository;