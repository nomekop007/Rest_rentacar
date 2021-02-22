class TarifaVehiculoRepository {

  constructor({ db }) {
    this.db = db;
  }

  postCreate(DATA) {
    return this.db.tarifaVehiculo.create(DATA);
  }

  postFindOrCreate(DATA, PATENTE) {
    return this.db.tarifaVehiculo.findOrCreate({
      where: { patente_vehiculo: PATENTE },
      defaults: DATA,
    });
  }

  getFindAll() {
    return this.db.tarifaVehiculo.findAll({
      include: [{ model: this.db.vehiculo }]
    });
  }

  getFindOne(PATENTE) {
    return this.db.tarifaVehiculo.findOne({
      where: { patente_vehiculo: PATENTE }
    });
  }

  //byPatente
  putUpdate(DATA, PATENTE) {
    return this.db.tarifaVehiculo.update(DATA, {
      where: { patente_vehiculo: PATENTE }
    })
  }

  putUpdateById(DATA, ID) {
    return this.db.tarifaVehiculo.update(DATA, {
      where: { id_tarifaVehiculo: ID }
    })
  }
}

module.exports = TarifaVehiculoRepository;