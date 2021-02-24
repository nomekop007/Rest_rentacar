
class AbonoService {

    constructor({ db }) {
        this._db = db;
    }

    async postCreateWithFacturacion(DATA) {
        return await this._db.abono.create(DATA, {
            include: [this._db.facturacion]
        });
    }


}


module.exports = AbonoService;