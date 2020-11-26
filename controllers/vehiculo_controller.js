const { Vehiculo, Region } = require("../database/db");
const { borrarImagenDeStorage } = require("../helpers/components");

class VehiculoController {
    async getVehiculos(req, res) {
        try {

            const vehiculos = await Vehiculo.findAll({
                include: [{ model: Region }],
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
            sendError(error, res);
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
            sendError(error, res);
        }
    }

    async createVehiculo(req, res, next) {
        try {
            const response = req.body;
            const [v, created] = await Vehiculo.findOrCreate({
                where: { patente_vehiculo: response.patente_vehiculo },
                defaults: response,
            });
            if (created) {
                res.json({
                    success: true,
                    msg: " Vehiculo registrado exitosamente",
                });
                next(v.logging);
            } else {
                res.json({
                    success: false,
                    msg: " Vehiculo ya existe",
                });
            }
        } catch (error) {
            sendError(error, res);
        }
    }

    async updateVehiculo(req, res, next) {
        try {
            const response = req.body;
            const v = await Vehiculo.update(response, {
                where: { patente_vehiculo: req.params.id },
            });

            res.json({
                success: true,
                msg: "Vehiculo modificado exitosamente",
            });
            next(v.logging);
        } catch (error) {
            sendError(error, res);
        }
    }


    async updateStateVehiculo(req, res, next) {
        try {
            const response = req.body;

            if (response.kilometrosMantencion_vehiculo == null) {
                delete response.kilometrosMantencion_vehiculo;
            }
            const vehiculo = await Vehiculo.update(response, {
                where: { patente_vehiculo: req.params.id },
            });
            res.json({
                success: true,
                msg: "Vehiculo modificado exitosamente",
                data: vehiculo,
            });
            next(vehiculo.logging);
        } catch (error) {
            sendError(error, res);
        }
    }

    async deleteVehiculo(req, res, next) {
        try {
            const vehiculo = await Vehiculo.destroy({
                where: { patente_vehiculo: req.params.id },
            });
            res.json({
                success: true,
                msg: " Vehiculo borrado exitosamente",
                data: req.params.id,
            });
            next(vehiculo.logging);
        } catch (error) {
            sendError(error, res);
        }
    }

    async uploadImageVehiculo(req, res, next) {
        try {
            console.log(req.file);

            const v = await Vehiculo.findOne({
                where: { patente_vehiculo: req.params.id },
            });

            // se pregunta si el vehiculo  tiene image asignada
            if (v.foto_vehiculo) {
                //se borra la actual para remplazarla por la nueva
                borrarImagenDeStorage(v.foto_vehiculo);
            }

            const vehiculo = await Vehiculo.update({ foto_vehiculo: req.file.filename }, {
                where: { patente_vehiculo: req.params.id },
            });

            res.json({
                success: true,
                msg: " imagen guardada",
            });


            next(vehiculo.logging);


        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = VehiculoController;