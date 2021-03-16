const BaseRepository = require("../../base/dataAccess/base.repository");

class LogErrorRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "logError")
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.logError.create(DATA)
    }

}

module.exports = LogErrorRepository;