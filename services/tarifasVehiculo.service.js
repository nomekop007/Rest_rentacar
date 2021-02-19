const { TarifaVehiculo, Vehiculo } = require("../config/database/db")

class TarifaVehiculoService {

  async postCreate(DATA) {
    return await TarifaVehiculo.create(DATA);
  }

  async postFindOrCreate(DATA, PATENTE) {
    return await TarifaVehiculo.findOrCreate({
      where: { patente_vehiculo: PATENTE },
      defaults: DATA,
    });
  }

  async getFindAll() {
    return await TarifaVehiculo.findAll({
      include: [{ model: Vehiculo }]
    });
  }

  async getFindOne(PATENTE) {
    return await TarifaVehiculo.findOne({
      where: { patente_vehiculo: PATENTE }
    });
  }

  //byPatente
  async putUpdate(DATA, PATENTE) {
    return await TarifaVehiculo.update(DATA, {
      where: { patente_vehiculo: PATENTE }
    })
  }

  async putUpdateById(DATA, ID) {
    return await TarifaVehiculo.update(DATA, {
      where: { id_tarifaVehiculo: ID }
    })
  }
}

module.exports = TarifaVehiculoService;