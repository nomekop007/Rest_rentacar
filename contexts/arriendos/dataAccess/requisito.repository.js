
class RequisitoRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.requisito.create(DATA);
    }

    deleteByIdArriendo(ID) {
        return this._db.requisito.destroy({
            where: { id_arriendo: ID }
        })
    }


}

module.exports = RequisitoRepository;