const BaseRepository = require("../../base/dataAccess/base.repository");

class AbonoService extends BaseRepository {

    constructor({ db }) {
        super(db, "abono")
        this._db = db;
    }

    async postCreateWithFacturacion(DATA) {
        return await this._db.abono.create(DATA, {
            include: [this._db.facturacion]
        });
    }


}


module.exports = AbonoService;