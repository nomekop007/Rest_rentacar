class PropietarioRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.propietario.findAll();
    }

}

module.exports = PropietarioRepository;