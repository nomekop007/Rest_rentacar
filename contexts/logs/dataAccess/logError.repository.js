class LogErrorRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.logError.create(DATA)
    }

}

module.exports = LogErrorRepository;