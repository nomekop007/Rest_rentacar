const BaseRepository = require("../../base/dataAccess/base.repository");


class ArriendoAnuladoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "arriendoAnulado");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.arriendoAnulado.create(DATA);
    }

}

module.exports = ArriendoAnuladoRepository;