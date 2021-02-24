class LogRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.log.create(DATA)
    }


}

module.exports = LogRepository;