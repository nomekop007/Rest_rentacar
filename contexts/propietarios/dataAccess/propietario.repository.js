const BaseRepository = require("../../base/dataAccess/base.repository");

class PropietarioRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "propietario")
        this._db = db;
    }

    getFindAll() {
        return this._db.propietario.findAll();
    }

}

module.exports = PropietarioRepository;