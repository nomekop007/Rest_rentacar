const BaseRepository = require("../../base/dataAccess/base.repository");

class RemplazoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "remplazo")
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.remplazo.create(DATA);
    }

    putUpdate(DATA, ID) {
        return this._db.remplazo.update(DATA, {
            where: { id_remplazo: ID },
        });
    }

}

module.exports = RemplazoRepository;