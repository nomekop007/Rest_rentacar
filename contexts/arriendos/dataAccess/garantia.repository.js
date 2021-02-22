class GarantiaRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.garantia.create(DATA);
    }

    deleteByIDarriendo(ID) {
        return this._db.garantia.destroy({
            where: { id_arriendo: ID }
        })
    }

}

module.exports = GarantiaRepository;