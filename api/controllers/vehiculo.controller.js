const { borrarImagenDeStorage } = require("../helpers/components");

class VehiculoController {

    constructor({ VehiculoService, SucursalService, ArriendoService, DanioVehiculoService, TarifaVehiculoService, ExtencionService, sendError }) {
        this._serviceVehiculo = VehiculoService;
        this._serviceSucursal = SucursalService;
        this._serviceArriendo = ArriendoService;
        this._serviceDanioVehiculo = DanioVehiculoService;
        this._serviceTarifaVehiculo = TarifaVehiculoService;
        this._serviceExtencion = ExtencionService;
        this.sendError = sendError;
    }


    async getVehiculos(req, res) {
        try {
            const vehiculos = await this._serviceVehiculo.getVehiculos();
            res.json({ success: true, data: vehiculos, });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async getAllVehiculos(req, res) {
        try {
            const vehiculos = await this._serviceVehiculo.getAllVehiculos();
            res.json({
                success: true,
                data: vehiculos
            })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findVehiculo(req, res) {
        try {
            const { id } = req.params;
            const vehiculo = await this._serviceVehiculo.findVehiculo(id);
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
            this.sendError(error, req, res);
        }
    }


    async createVehiculo(req, res, next) {
        try {
            const vehiculo = req.body;
            const payload = await this._serviceVehiculo.createVehiculo(vehiculo);
            res.json(payload);
            if (payload.success) {
                next();
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async updateStateVehiculo(req, res, next) {
        try {
            const vehiculo = req.body;
            const { id } = req.params;
            const vehiculoRepo = this._serviceVehiculo.updateStateVehiculo(vehiculo, id);
            res.json({
                success: true,
                msg: "Vehiculo modificado exitosamente",
                data: vehiculoRepo,
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async deleteVehiculo(req, res, next) {
        try {
            const { id } = req.params;
            await this._serviceVehiculo.deleteVehiculo(id);
            res.json({
                success: true,
                msg: " Vehiculo borrado exitosamente",
                data: id,
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async uploadImageVehiculo(req, res, next) {
        try {
            const { id } = req.params;
            const v = await this._serviceVehiculo.findVehiculo(id);
            // se pregunta si el vehiculo  tiene image asignada
            if (v.foto_vehiculo) borrarImagenDeStorage(v.foto_vehiculo, process.env.PATH_FOTO_VEHICULO);
            const payload = await this._serviceVehiculo.updateImageVehiculo(req.file.filename, id);
            res.json(payload);
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateVehiculo(req, res, next) {
        try {
            const vehiculo = req.body;
            const { id } = req.params;
            const payload = await this._serviceVehiculo.updateVehiculo(vehiculo, id);
            res.json(payload);
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

}




module.exports = VehiculoController;