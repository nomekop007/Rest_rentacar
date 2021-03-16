const BaseRepository = require("../../base/dataAccess/base.repository");

class ContratoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "contrato");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.contrato.create(DATA);
    }

    deleteByIDArriendo(ID) {
        return this._db.contrato.destroy({
            where: { id_arriendo: ID }
        });
    }


}

module.exports = ContratoRepository;