const BaseRepository = require("../../base/dataAccess/base.repository");

class PagoExtraRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "pagoExtra")
        this._db = db;
    }


    postCreate(DATA) {
        return this._db.pagoExtra.create(DATA);
    }

    findAllByIdArriendo(ID) {
        return this._db.pagoExtra.findAll({
            where: { id_arriendo: ID },
            include: { model: this._db.facturacion }
        })
    }

    deleteById(ID) {
        return this._db.pagoExtra.destroy({
            where: { id_pagoExtra: ID }
        })
    }

    putUpdateByID(DATA, ID) {
        return this._db.pagoExtra.update(DATA, {
            where: { id_pagoExtra: ID }
        })
    }
}


module.exports = PagoExtraRepository;
