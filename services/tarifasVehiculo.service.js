const { TarifaVehiculo, Vehiculo } = require("../database/db")

class TarifaVehiculoService {

  async postCreate(DATA) {
    return await TarifaVehiculo.create(DATA);
  }

  async postFindOrCreate(DATA, ID) {
    return await TarifaVehiculo.findOrCreate({
      where: { patente_vehiculo: ID },
      defaults: DATA,
    });
  }

  async getFindAll() {
    return await TarifaVehiculo.findAll({
      include: [{ model: Vehiculo }]
    });
  }

  async getFindOne(ID) {
    return await TarifaVehiculo.findOne({
      where: { patente_vehiculo: ID }
    });
  }

  async putUpdate(DATA, ID) {
    return await TarifaVehiculo.update(DATA, {
      where: { patente_vehiculo: ID }
    })
  }
}

module.exports = TarifaVehiculoService;