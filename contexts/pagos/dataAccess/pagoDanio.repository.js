class PagoDanioRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.pagoDanio.create(DATA);
    }

}

module.exports = PagoDanioRepository;