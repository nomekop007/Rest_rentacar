
class DespachoRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.despacho.create(DATA);
    }

    putUpdate(DATA, ID) {
        return this._db.despacho.update(DATA, {
            where: { id_despacho: ID },
        });
    }


}

module.exports = DespachoRepository;