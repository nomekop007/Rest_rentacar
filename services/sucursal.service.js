const { Sucursal, Vehiculo, Region } = require("../database/db");

class SucursalService {

    async getFindAll() {
        return await Sucursal.findAll({
            include: [{ model: Region }]
        });
    }

    async getFindOne(ID) {
        return await Sucursal.findOne({
            where: { id_sucursal: ID },
        })
    }

    async getFindByName(NAME) {
        return await Sucursal.findOne({
            where: { nombre_sucursal: NAME },
            include: [
                {
                    model: Region,
                    include: [{
                        model: Vehiculo,
                        where: { estado_vehiculo: "DISPONIBLE" },
                        attributes: [
                            "patente_vehiculo",
                            "modelo_vehiculo",
                            "año_vehiculo",
                            "marca_vehiculo",
                        ],
                    },]
                }
            ],
        });
    }

    async postCreate(DATA) {
        return await Sucursal.create(DATA);
    }

    async putUpdate(ID, DATA) {
        return await Sucursal.update(DATA, {
            where: { id_sucursal: ID },
        });
    }



}

module.exports = SucursalService;