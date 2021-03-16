const BaseRepository = require("../../base/dataAccess/base.repository");

class LogRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "log");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.log.create(DATA)
    }


}

module.exports = LogRepository;