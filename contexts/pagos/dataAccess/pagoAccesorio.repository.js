const BaseRepository = require("../../base/dataAccess/base.repository");

class PagoAccesorioRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "pagoAccesorio")
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.pagoAccesorio.create(DATA);
    }

}

module.exports = PagoAccesorioRepository;