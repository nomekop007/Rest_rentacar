
class PagoHistorialRepository {

    constructor({ db }) {
        this._db = db;
    }


    postCreate(DATA) {
        this._db.pagoHistorial.create(DATA);
    }

    findAllByIdPago(ID) {
        this._db.pagoHistorial.findAll({
            where: { id_pago: ID }
        })
    }
}


module.exports = PagoHistorialRepository;
