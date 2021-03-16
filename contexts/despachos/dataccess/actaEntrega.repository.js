const BaseRepository = require("../../base/dataAccess/base.repository");

class ActaEntregaService extends BaseRepository {

    constructor({ db }) {
        super(db, "actaEntrega");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.actaEntrega.create(DATA);
    }


    getFindOneByIDdespacho(ID_DESPACHO) {
        return this._db.actaEntrega.findOne({
            where: { id_despacho: ID_DESPACHO }
        });
    }


}


module.exports = ActaEntregaService;