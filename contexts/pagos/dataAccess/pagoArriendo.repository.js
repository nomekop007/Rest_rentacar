const BaseRepository = require("../../base/dataAccess/base.repository");

class PagoArriendoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "pagoArriendo")
        this._db = db;
    }

    putUpdate(DATA, ID) {
        return this._db.pagoArriendo.update(DATA, {
            where: { id_pagoArriendo: ID }
        });
    }

    postCreate(DATA) {
        return this._db.pagoArriendo.create(DATA);
    }

    deleteByIDarriendo(ID) {
        return this._db.pagoArriendo.destroy({
            where: { id_arriendo: ID },
        })
    }

}

module.exports = PagoArriendoRepository;