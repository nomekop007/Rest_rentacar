const BaseRepository = require("../../base/dataAccess/base.repository");

class FotoRecepcionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, 'fotoRecepcion');
        this._db = db;
    }



}

module.exports = FotoRecepcionRepository;