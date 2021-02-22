class RemplazoRepository {

    constructor({ db }) {
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