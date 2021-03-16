const BaseRepository = require("../../base/dataAccess/base.repository");

class EmpresaRemplazoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "empresaRemplazo");
        this._db = db;
    }

    getFindAll() {
        return this._db.empresaRemplazo.findAll();
    }

}

module.exports = EmpresaRemplazoRepository;