const BaseRepository = require("../../base/dataAccess/base.repository");

class FacuracionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "facturacion")
        this._db = db;
    }

    getFindAll() {
        return this._db.facturacion.findAll({
            include: this._db.pago,
        });
    }


    postCreate(DATA) {
        return this._db.facturacion.create(DATA);
    }


    putUpdate(DATA, ID) {
        return this._db.facturacion.update(DATA, {
            where: { id_facturacion: ID },
        });
    }

}

module.exports = FacuracionRepository;