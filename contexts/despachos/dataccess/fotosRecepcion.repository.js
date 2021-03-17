const BaseRepository = require("../../base/dataAccess/base.repository");

class FotoRecepcionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, 'fotoRecepcion');
        this._db = db;
    }

    getFindAllByArriendo(ID) {
        return this._db.fotoRecepcion.findAll({
            where: { id_arriendo: ID }
        });
    }



}

module.exports = FotoRecepcionRepository;