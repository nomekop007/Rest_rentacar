
class VehiculoRepository {

    constructor({ db }) {
        this._db = db;
    }

    postFindOrCreate(DATA, PATENTE) {
        return this._db.vehiculo.findOrCreate({
            where: { patente_vehiculo: PATENTE },
            defaults: DATA,
        });
    }

    getFindAllByDisponible() {
        return this._db.vehiculo.findAll({
            where: { estado_vehiculo: "DISPONIBLE" },
            include: { model: this._db.sucursal }
        })
    }

    getFindAll() {
        return this._db.vehiculo.findAll({
            include: [{ model: this._db.region, include: [{ model: this._db.sucursal }] }, { model: this._db.sucursal }],
        });
    }

    getFindAllWithArriendo() {
        return this._db.vehiculo.findAll({
            include: { model: this._db.arriendo },
        });
    }

    getFindAllArrendados() {
        return this._db.vehiculo.findAll({
            where: { estado_vehiculo: "ARRENDADO" },
            include: [{ model: this._db.arriendo, include: [{ model: this._db.empresa }, { model: this._db.sucursal }, { model: this._db.cliente }, { model: this._db.remplazo, include: { model: this._db.cliente } }] }]
        })
    }

    getFindAllBySucursalDispoinble(id_sucursal) {
        return this._db.vehiculo.findAll({
            where: { id_sucursal: id_sucursal, estado_vehiculo: "DISPONIBLE" },
        });
    }

    getFindAllWithRegion(ID_REGION) {
        return this._db.vehiculo.findAll({
            where: { id_region: ID_REGION },
            include: { model: this._db.region }
        });
    }


    getFindOne(PATENTE) {
        return this._db.vehiculo.findOne({
            where: { patente_vehiculo: PATENTE },
        });
    }

    putUpdateByPatente(DATA, PATENTE) {
        return this._db.vehiculo.update(DATA, {
            where: { patente_vehiculo: PATENTE },
        });
    }

    putUpdateById(DATA, ID) {
        return this._db.vehiculo.update(DATA, {
            where: { id_vehiculo: ID }
        });
    }

    getFindOneById(ID) {
        return this._db.vehiculo.findOne({
            where: { id_vehiculo: ID },
            include: [{ model: this._db.arriendo }, { model: this._db.danioVehiculo }, { model: this._db.tarifaVehiculo }, { model: this._db.extencion }]
        });
    }


    deleteDestroy(PATENTE) {
        return this._db.vehiculo.destroy({
            where: { patente_vehiculo: PATENTE },
        });
    }



}

module.exports = VehiculoRepository;