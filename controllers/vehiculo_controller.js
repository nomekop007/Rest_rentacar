const { Vehiculo, Sucursal } = require("../db");

class VehiculoController {
    async getVehiculos(req, res) {
        const vehiculos = await Vehiculo.findAll({
            include: [{ model: Sucursal, attributes: ["nombre_sucursal"] }],
            attributes: [
                "patente_vehiculo",
                "modelo_vehiculo",
                "año_vehiculo",
                "tipo_vehiculo",
            ],
        });
        res.json({
            success: true,
            data: vehiculos,
        });
    }

    async createVehiculo(req, res) {
        const response = req.body;

        const [v, created] = await Vehiculo.findOrCreate({
            where: { patente_vehiculo: req.body.patente_vehiculo },
            defaults: response,
        });

        if (created) {
            const vehiculo = await Vehiculo.findOne({
                include: [{ model: Sucursal, attributes: ["nombre_sucursal"] }],
                where: { patente_vehiculo: v.patente_vehiculo },
                attributes: [
                    "patente_vehiculo",
                    "modelo_vehiculo",
                    "año_vehiculo",
                    "tipo_vehiculo",
                ],
            });

            res.json({
                success: true,
                msg: " Vehiculo creado exitosamente",
                data: vehiculo,
            });
        } else {
            res.json({
                success: false,
                msg: " Vehiculo ya existe",
            });
        }
    }

    async updateVehiculo(req, res) {
        await Vehiculo.update(req.body, {
            where: { patente_vehiculo: req.params.id },
        });

        res.json({
            success: true,
            msg: "Vehiculo modificado exitosamente",
            data: req.body,
        });
    }

    async deleteVehiculo(req, res) {
        await Vehiculo.destroy({
            where: { patente_vehiculo: req.params.id },
        });
        res.json({
            success: true,
            msg: " Vehiculo borrado exitosamente",
            data: req.params.id,
        });
    }
}

module.exports = VehiculoController;