
class EmpresaRemplazoRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.empresaRemplazo.findAll();
    }

}

module.exports = EmpresaRemplazoRepository;