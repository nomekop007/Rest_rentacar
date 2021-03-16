const BaseRepository = require("../../base/dataAccess/base.repository");

class PagoDanioRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "pagoDanio");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.pagoDanio.create(DATA);
    }

}

module.exports = PagoDanioRepository;