const { DanioVehiculo, Arriendo, Empresa, Facturacion, PagoDanio, Vehiculo, Cliente, Remplazo } = require("../database/db");

class DanioVehiculoService {

    async postCreate(DATA) {
        return await DanioVehiculo.create(DATA);
    }

    async getFindAll() {
        return await DanioVehiculo.findAll({
            include: [
                { model: Arriendo, include: [{ model: Empresa }, { model: Cliente }, { model: Remplazo, include: { model: Cliente } }] },
                { model: Vehiculo },
                { model: PagoDanio, include: { model: Facturacion } }]
        });
    }

    async putUpdate(DATA, ID) {
        return await DanioVehiculo.update(DATA, {
            where: { id_danioVehiculo: ID },
        });
    }

    async getFindByPk(ID) {
        return await DanioVehiculo.findByPk(ID);
    }

}

module.exports = DanioVehiculoService;