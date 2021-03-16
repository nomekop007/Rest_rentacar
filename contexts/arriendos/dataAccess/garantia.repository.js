const BaseRepository = require("../../base/dataAccess/base.repository");

class GarantiaRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "garantia");
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