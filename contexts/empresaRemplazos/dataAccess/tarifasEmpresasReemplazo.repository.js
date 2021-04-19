const BaseRepository = require("../../base/dataAccess/base.repository");

class TarifasEmpresasReemplazoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "tarifasEmpresasReemplazo")
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.tarifasEmpresasReemplazo.create(DATA);
    }

    putUpdate(ID,DATA) {
        return this._db.tarifasEmpresasReemplazo.update(DATA, {
            where: { id_tarifaEmpresaRemplazo: ID },
        });
    }

}

module.exports = TarifasEmpresasReemplazoRepository;