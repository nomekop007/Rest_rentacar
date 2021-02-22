class PagoAccesorioRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.pagoAccesorio.create(DATA);
    }

}

module.exports = PagoAccesorioRepository;