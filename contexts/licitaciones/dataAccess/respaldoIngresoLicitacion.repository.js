const BaseRepository = require("../../base/dataAccess/base.repository");

class RespaldoIngresoLicitacionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "respaldoIngresoLicitacion");
        this._db = db;
    }

}


module.exports = RespaldoIngresoLicitacionRepository;