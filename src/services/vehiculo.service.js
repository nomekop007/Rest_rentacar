const { Vehiculo, Region, Sucursal, Arriendo, DanioVehiculo, TarifaVehiculo, Extencion } = require("../database/db");

class VehiculoService {



    async postFindOrCreate(DATA, PATENTE) {
        return await Vehiculo.findOrCreate({
            where: { patente_vehiculo: PATENTE },
            defaults: DATA,
        });
    }

    async getFindAllWithRegion(ID_REGION) {
        return await Vehiculo.findAll({
            where: { id_region: ID_REGION },
            include: { model: Region }
        });
    }

    async getFindAll() {
        return await Vehiculo.findAll({
            include: [{ model: Region, include: [{ model: Sucursal }] }],
        });
    }


    async getFindOne(PATENTE) {
        return await Vehiculo.findOne({
            where: { patente_vehiculo: PATENTE },
        });
    }

    //by patente
    async putUpdate(DATA, PATENTE) {
        return await Vehiculo.update(DATA, {
            where: { patente_vehiculo: PATENTE },
        });
    }

    async putUpdateById(DATA, ID) {
        return await Vehiculo.update(DATA, {
            where: { id_vehiculo: ID }
        });
    }

    async getFindOneById(ID) {
        return await Vehiculo.findOne({
            where: { id_vehiculo: ID },
            include: [{ model: Arriendo }, { model: DanioVehiculo }, { model: TarifaVehiculo }, { model: Extencion }]
        });
    }


    async deleteDestroy(PATENTE) {
        return await Vehiculo.destroy({
            where: { patente_vehiculo: PATENTE },
        });
    }


}

module.exports = VehiculoService;