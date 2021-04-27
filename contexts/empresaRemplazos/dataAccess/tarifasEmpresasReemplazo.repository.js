const BaseRepository = require("../../base/dataAccess/base.repository");

class TarifasEmpresasReemplazoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "tarifasEmpresasReemplazo")
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.tarifasEmpresasReemplazo.create(DATA);
    }

    getFindAll() {
        return this._db.tarifasEmpresasReemplazo.findAll();
    }


    putUpdate(ID,DATA) {
        return this._db.tarifasEmpresasReemplazo.update(DATA, {
            where: { id_tarifaEmpresaRemplazo: ID },
        });
    }

    getAllPorEmpresa(ID) {
        return this._db.tarifasEmpresasReemplazo.findAll( {
            where: { codigo_empresaRemplazo: ID },
        });
    }



}

module.exports = TarifasEmpresasReemplazoRepository;