const BaseRepository = require("../../base/dataAccess/base.repository");


class CartasReemplazoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "cartaReemplazos");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.cartaReemplazos.create(DATA);
    }

}

module.exports = CartasReemplazoRepository;