const BaseRepository = require("../../base/dataAccess/base.repository");

class LicitacionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "licitacion");
        this._db = db;
    }

    getFindAll() {
        return this._db.licitacion.findAll({
            include: [
                { model: this._db.clienteLicitacion },
                { model: this._db.propietario },
            ],
        });
    }
}


module.exports = LicitacionRepository;