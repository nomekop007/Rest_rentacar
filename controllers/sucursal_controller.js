const { Sucursal, Vehiculo, Region } = require("../database/db");
const { sendError } = require("../helpers/components");

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
            sendError(error, res);
        }
    }

    async getFindVehiculosPorSucursal(req, res) {
        try {
            const sucursal = await Sucursal.findOne({
                where: {
                    nombre_sucursal: req.params.id_sucursal,
                },
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

            res.json({
                success: true,
                data: sucursal,
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = SucursalController;