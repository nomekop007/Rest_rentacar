const BaseRepository = require("../../base/dataAccess/base.repository");

class IngresoLicitacionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "ingresoLicitacion");
        this._db = db;
    }

    getFindAll() {
        return this._db.ingresoLicitacion.findAll({
            include: [
                {
                    model: this._db.licitacion, include: [
                        { model: this._db.clienteLicitacion },
                        { model: this._db.propietario },]
                },
            ],
        });
    }


}


module.exports = IngresoLicitacionRepository;