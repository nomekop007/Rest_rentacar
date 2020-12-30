const { Vehiculo, Region, Sucursal } = require("../database/db");

class VehiculoService {



    async postFindOrCreate(DATA, ID) {
        return await Vehiculo.findOrCreate({
            where: { patente_vehiculo: ID },
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


    async getFindOne(ID) {
        return await Vehiculo.findOne({
            where: { patente_vehiculo: ID },
        });
    }


    async putUpdate(DATA, ID) {
        return await Vehiculo.update(DATA, {
            where: { patente_vehiculo: ID },
        });
    }


    async deleteDestroy(ID) {
        return await Vehiculo.destroy({
            where: { patente_vehiculo: ID },
        });
    }


}

module.exports = VehiculoService;