const VehiculoService = require("../services/vehiculo.service");
const { borrarImagenDeStorage, sendError } = require("../helpers/components");
class VehiculoController {

    constructor() {
        this.serviceVehiculo = new VehiculoService();
    }


    async getVehiculos(req, res) {
        try {
            const vehiculos = await this.serviceVehiculo.getFindAll();
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
            const vehiculo = await this.serviceVehiculo.getFindOne(req.params.id);
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
            const [v, created] = await this.serviceVehiculo.postFindOrCreate(response, response.patente_vehiculo);
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
            const v = await this.serviceVehiculo.putUpdate(response, req.params.id);
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
            if (response.kilometrosMantencion_vehiculo == null) delete response.kilometrosMantencion_vehiculo;
            const vehiculo = await this.serviceVehiculo.putUpdate(response, req.params.id);
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
            const vehiculo = await this.serviceVehiculo.deleteDestroy(req.params.id);
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
            const v = await this.serviceVehiculo.getFindOne(req.params.id);
            // se pregunta si el vehiculo  tiene image asignada
            if (v.foto_vehiculo) borrarImagenDeStorage(v.foto_vehiculo);
            const data = { foto_vehiculo: req.file.filename };
            const vehiculo = await this.serviceVehiculo.putUpdate(data, req.params.id);
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