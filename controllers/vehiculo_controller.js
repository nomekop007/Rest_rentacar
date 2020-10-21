const { Vehiculo, Sucursal } = require("../db");
const fs = require("fs");
const path = require("path");

class VehiculoController {
    async getVehiculos(req, res) {
        try {
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
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async findVehiculo(req, res) {
        try {
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
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async createVehiculo(req, res) {
        try {
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
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async updateVehiculo(req, res) {
        try {
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
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async deleteVehiculo(req, res) {
        try {
            await Vehiculo.destroy({
                where: { patente_vehiculo: req.params.id },
            });
            res.json({
                success: true,
                msg: " Vehiculo borrado exitosamente",
                data: req.params.id,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async uploadImageVehiculo(req, res) {
        try {
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
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
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