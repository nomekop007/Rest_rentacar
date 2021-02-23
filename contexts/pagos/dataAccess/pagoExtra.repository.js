
class PagoExtraRepository {

    constructor({ db }) {
        this._db = db;
    }


    postCreate(DATA) {
        return this._db.pagoExtra.create(DATA);
    }

    findAllByIdArriendo(ID) {
        return this._db.pagoExtra.findAll({
            where: { id_arriendo: ID }
        })
    }
}


module.exports = PagoExtraRepository;
