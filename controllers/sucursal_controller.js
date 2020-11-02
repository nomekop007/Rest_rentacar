const { Sucursal, Vehiculo } = require("../db");

class SucursalController {
    async getSucursales(req, res) {
        try {
            const sucursales = await Sucursal.findAll({
                attributes: ["id_sucursal", "nombre_sucursal"],
            });
            res.json({
                success: true,
                data: sucursales,
            });
        } catch (error) {
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }

    async getFindVehiculosPorSucursal(req, res) {
        try {
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
                        "kilometraje_vehiculo",
                    ],
                }, ],
            });

            res.json({
                success: true,
                data: sucursal,
            });
        } catch (error) {
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }
}

module.exports = SucursalController;