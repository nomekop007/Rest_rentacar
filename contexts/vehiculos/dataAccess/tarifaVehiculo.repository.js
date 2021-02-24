class TarifaVehiculoRepository {

  constructor({ db }) {
    this._db = db;
  }

  postCreate(DATA) {
    return this._db.tarifaVehiculo.create(DATA);
  }

  postFindOrCreate(DATA, PATENTE) {
    return this._db.tarifaVehiculo.findOrCreate({
      where: { patente_vehiculo: PATENTE },
      defaults: DATA,
    });
  }

  getFindAll() {
    return this._db.tarifaVehiculo.findAll({
      include: [{ model: this._db.vehiculo }]
    });
  }

  getFindOne(PATENTE) {
    return this._db.tarifaVehiculo.findOne({
      where: { patente_vehiculo: PATENTE }
    });
  }

  //byPatente
  putUpdate(DATA, PATENTE) {
    return this._db.tarifaVehiculo.update(DATA, {
      where: { patente_vehiculo: PATENTE }
    })
  }

  putUpdateById(DATA, ID) {
    return this._db.tarifaVehiculo.update(DATA, {
      where: { id_tarifaVehiculo: ID }
    })
  }
}

module.exports = TarifaVehiculoRepository;