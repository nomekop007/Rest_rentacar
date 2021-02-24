
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

    getFindAllWithRegion(ID_REGION) {
        return this._db.vehiculo.findAll({
            where: { id_region: ID_REGION },
            include: { model: this._db.region }
        });
    }

    getFindAll() {
        return this._db.vehiculo.findAll({
            include: [{ model: this._db.region, include: [{ model: this._db.sucursal }] }],
        });
    }


    getFindOne(PATENTE) {
        return this._db.vehiculo.findOne({
            where: { patente_vehiculo: PATENTE },
        });
    }

    //by patente
    putUpdate(DATA, PATENTE) {
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