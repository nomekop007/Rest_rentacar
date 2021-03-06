const borrarImagenDeStorage = require("../../helpers/deleteImageStorage");
const sendError = require('../../helpers/sendError');
class VehiculoController {

    constructor({ VehiculoService }) {
        this._vehiculoService = VehiculoService;
    }

    // creadas por Esteban Mallea

    async createDanioVehiculo_new(req, res) {
        try {
            const DATA = req.body;
            const response = await this._vehiculoService.createDanioVehiculo_new(DATA);
            if (response) {
                res.json({
                    success: true,
                    msg: "daño registrado"
                })
            } else {
                res.json({
                    success: false,
                    msg: "error"
                })
            }
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async eliminar_danio_vehiculo_new(req,res){
        try {
            const DATA = req.body;
            await this._vehiculoService.deleteDanioVehiculo_new(DATA);
            res.json({
                success: true,
                msg: " Daño borrado exitosamente",
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }



    // realizadas por diego rios


    async getVehiculos(req, res) {
        try {
            const vehiculos = await this._vehiculoService.getVehiculos();
            res.json({ success: true, data: vehiculos, });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async getVehiculosDisponibles(req, res) {
        try {

            const vehiculos = await this._vehiculoService.getVehiculosDisponibles();
            res.json({ success: true, data: vehiculos });
        } catch (error) {
            sendError(error, req, res);
        }

    }

    async getVehiculosDisponiblesBySucursal(req, res) {
        try {
            const { id } = req.params;
            const vehiculos = await this._vehiculoService.getVehiculosDisponiblesBySucursal(id);
            res.json({ success: true, data: vehiculos });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async getVehiculosArrendadosBySucursal(req, res) {
        try {
            const { id } = req.params;
            const vehiculos = await this._vehiculoService.getVehiculosArrendadosBySucursal(id);
            res.json({ success: true, data: vehiculos });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async findVehiculo(req, res) {
        try {
            const { id } = req.params;
            const vehiculo = await this._vehiculoService.findVehiculo(id);
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
            sendError(error, req, res);
        }
    }


    async createVehiculo(req, res, next) {
        try {
            const vehiculo = req.body;
            const payload = await this._vehiculoService.createVehiculo(vehiculo);
            res.json(payload);
            if (payload.success) {
                next();
            }
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async updateStateVehiculo(req, res, next) {
        try {
            const vehiculo = req.body;
            const { id } = req.params;
            const vehiculoRepo = this._vehiculoService.updateStateVehiculo(vehiculo, id);
            res.json({
                success: true,
                msg: "Vehiculo modificado exitosamente",
                data: vehiculoRepo,
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async deleteVehiculo(req, res, next) {
        try {
            const { id } = req.params;
            await this._vehiculoService.deleteVehiculo(id);
            res.json({
                success: true,
                msg: " Vehiculo borrado exitosamente",
                data: id,
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async uploadImageVehiculo(req, res, next) {
        try {
            const { id } = req.params;
            const v = await this._vehiculoService.findVehiculo(id);
            // se pregunta si el vehiculo  tiene image asignada
            if (v.foto_vehiculo) borrarImagenDeStorage(v.foto_vehiculo, process.env.PATH_FOTO_VEHICULO);
            const payload = await this._vehiculoService.updateImageVehiculo(req.file.filename, id);
            res.json(payload);
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updateVehiculo(req, res, next) {
        try {
            const vehiculo = req.body;
            const { id } = req.params;
            const payload = await this._vehiculoService.updateVehiculo(vehiculo, id);
            res.json(payload);
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createDanioVehiculo(req, res) {
        try {
            const { id_arriendo, descripcion_danio, arrayImages, userAt } = req.body;
            const response = await this._vehiculoService.createDanioVehiculo(id_arriendo, descripcion_danio, arrayImages, userAt);
            if (response) {
                res.json({
                    success: true,
                    msg: "daño registrado"
                })
            } else {
                res.json({
                    success: false,
                    msg: "error al guardar las fotos del daño"
                })
            }
        } catch (error) {
            sendError(error, req, res);;
        }
    }


    async consultarDanioVehiculo(req, res) {
        try {
            const { id } = req.params;
            const response = await this._vehiculoService.consultarDanioVehiculo(id);
            res.json({
                success: true,
                data: response
            })
        } catch (error) {
            sendError(error, req, res);;
        }
    }


    async getDanioVehiculo(req, res) {
        try {
            const { sucursal } = req.query;
            const danios = await this._vehiculoService.getDanioVehiculo(sucursal);
            res.json({
                success: true,
                data: danios
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async updateDanioVehiculo(req, res, next) {
        try {
            const danio = req.body;
            const { id } = req.params;
            await this._vehiculoService.updateDanioVehiculo(danio, id);
            res.json({
                success: true,
                msg: "estado daño actualizado",
            });
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async createTarifaVehiculo(req, res, next) {
        try {
            const { TARIFASVEHICULOS, userAt } = req.body;
            await this._vehiculoService.createTarifaVehiculo(TARIFASVEHICULOS, userAt);
            res.json({
                success: true,
                msg: "asignacion exitosa!"
            })
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async getTarifaVehiculo(req, res) {
        try {
            const tarifasVehiculos = await this._vehiculoService.getTarifaVehiculo();
            res.json({
                success: true,
                data: tarifasVehiculos
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async findTarifaVehiculoByDias(req, res) {
        try {
            const { patente, dias } = req.query;
            const payload = await this._vehiculoService.findTarifaVehiculoByDias(patente, dias);
            res.json({
                success: true,
                data: payload
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async getVehiculosArrendados(req, res) {
        try {
            const vehiculos = await this._vehiculoService.getVehiculosArrendados();
            res.json({ success: true, data: vehiculos })
        } catch (error) {
            sendError(error, req, res);
        }
    }

}




module.exports = VehiculoController;