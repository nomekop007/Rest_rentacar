const { Vehiculo, Sucursal } = require("../db");
const fs = require("fs");
const path = require("path");

class VehiculoController {
    async getVehiculos(req, res) {
        //preguntar si el usuario no es administrador
        const where = {};
        if (req.body.id_rol != 1) {
            where.id_sucursal = req.body.id_sucursal;
        }

        const vehiculos = await Vehiculo.findAll({
            where: where,
            include: [{ model: Sucursal, attributes: ["nombre_sucursal"] }],
            attributes: [
                "patente_vehiculo",
                "marca_vehiculo",
                "modelo_vehiculo",
                "año_vehiculo",
                "tipo_vehiculo",
                "transmision_vehiculo",
                "estado_vehiculo",
            ],
        });
        res.json({
            success: true,
            data: vehiculos,
        });
    }

    async findVehiculo(req, res) {
        const vehiculo = await Vehiculo.findOne({
            where: { patente_vehiculo: req.params.id },
        });
        if (vehiculo) {
            res.json({
                success: true,
                data: vehiculo,
            });
        } else {
            res.json({
                success: false,
                msg: "sin datos",
            });
        }
    }

    async createVehiculo(req, res) {
        const response = req.body;

        const [v, created] = await Vehiculo.findOrCreate({
            where: { patente_vehiculo: response.patente_vehiculo },
            defaults: response,
        });
        if (created) {
            const vehiculo = await Vehiculo.findOne({
                include: [{ model: Sucursal, attributes: ["nombre_sucursal"] }],
                where: { patente_vehiculo: v.patente_vehiculo },
                attributes: [
                    "patente_vehiculo",
                    "marca_vehiculo",
                    "modelo_vehiculo",
                    "año_vehiculo",
                    "tipo_vehiculo",
                    "transmision_vehiculo",
                    "estado_vehiculo",
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

        const vehiculo = await Vehiculo.findOne({
            include: [{ model: Sucursal, attributes: ["nombre_sucursal"] }],
            where: { patente_vehiculo: req.params.id },
            attributes: [
                "patente_vehiculo",
                "marca_vehiculo",
                "modelo_vehiculo",
                "año_vehiculo",
                "tipo_vehiculo",
                "transmision_vehiculo",
                "estado_vehiculo",
            ],
        });

        res.json({
            success: true,
            msg: "Vehiculo modificado exitosamente",
            data: vehiculo,
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

    async uploadImageVehiculo(req, res) {
        const vehiculo = await Vehiculo.findOne({
            where: { patente_vehiculo: req.params.id },
        });

        // se pregunta si el vehiculo  tiene image asignada
        if (vehiculo.foto_vehiculo) {
            //se borra la actual para remplazarla por la nueva
            borrarImagenDeStorage(vehiculo.foto_vehiculo);
        }

        await Vehiculo.update({ foto_vehiculo: req.file.filename }, {
            where: { patente_vehiculo: req.params.id },
        });

        res.json({
            success: true,
            msg: " imagen guardada",
        });
    }
}

function borrarImagenDeStorage(name) {
    try {
        fs.unlinkSync(path.join(__dirname, "../uploads/fotosVehiculos/" + name));
        return true;
    } catch (err) {
        return console.log(err);
    }
}

module.exports = VehiculoController;