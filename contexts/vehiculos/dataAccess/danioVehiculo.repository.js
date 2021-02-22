
class DanioVehiculoRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.danioVehiculo.create(DATA);
    }

    getFindAll() {
        return this._db.danioVehiculo.findAll({
            include: [
                { model: this._db.arriendo, include: [{ model: this._db.empresa }, { model: this._db.cliente }, { model: this._db.remplazo, include: { model: this._db.cliente } }] },
                { model: this._db.vehiculo },
                { model: this._db.pagoDanio, include: { model: this._db.facturacion } }]
        });
    }

    putUpdate(DATA, ID) {
        return this._db.danioVehiculo.update(DATA, {
            where: { id_danioVehiculo: ID },
        });
    }

    getFindByPk(ID) {
        return this._db.danioVehiculo.findByPk(ID);
    }

}

module.exports = DanioVehiculoRepository;