const { Sucursal, Vehiculo } = require("../db");

class SucursalController {
    async getSucursales(req, res) {
        const sucursales = await Sucursal.findAll({
            attributes: ["id_sucursal", "nombre_sucursal"],
        });
        res.json({
            success: true,
            data: sucursales,
        });
    }

    async getFindVehiculosPorSucursal(req, res) {
        const sucursal = await Sucursal.findOne({
            where: {
                id_sucursal: req.params.id_sucursal,
            },
            include: [{
                model: Vehiculo,
                where: { estado_vehiculo: "DISPONIBLE" },
                attributes: [
                    "patente_vehiculo",
                    "modelo_vehiculo",
                    "año_vehiculo",
                    "marca_vehiculo",
                ],
            }, ]
        })

        res.json({
            success: true,
            data: sucursal,
        });
    }
}

module.exports = SucursalController;