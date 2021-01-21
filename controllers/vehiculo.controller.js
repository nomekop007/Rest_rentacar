const { v4: uuidv4 } = require("uuid");
const VehiculoService = require('../services/vehiculo.service');
const SucursalService = require("../services/sucursal.service");
const ArriendoService = require("../services/arriendo.service");
const DanioService = require("../services/danioVehiculo.service");
const TarifaVehiculoService = require("../services/tarifasVehiculo.service");
const { borrarImagenDeStorage, sendError } = require("../helpers/components");
class VehiculoController {

    constructor() {
        this.serviceVehiculo = new VehiculoService();
        this.serviceSucursal = new SucursalService();
        this.serviceArriendo = new ArriendoService();
        this.serviceDanio = new DanioService();
        this.serviceTarifaVehiculo = new TarifaVehiculoService();
    }


    async getVehiculos(req, res) {
        try {
            const { sucursal, rol } = req.query;
            const { id_region } = await this.serviceSucursal.getFindOne(sucursal);
            let vehiculos = null;
            if (rol === 1) vehiculos = await this.serviceVehiculo.getFindAll();
            else vehiculos = await this.serviceVehiculo.getFindAllWithRegion(id_region);


            vehiculos.map(({ id_vehiculo, patente_vehiculo }) => {
                if (!id_vehiculo) {
                    setTimeout(async () => {
                        await this.serviceVehiculo.putUpdate({ id_vehiculo: uuidv4() }, patente_vehiculo);
                        console.log(patente_vehiculo)
                    }, 1000);
                }
            })

            res.json({
                success: true,
                data: vehiculos,
            });
        } catch (error) {
            sendError(error, res);
        }
    }


    async getAllVehiculos(req, res) {
        try {
            const vehiculos = await this.serviceVehiculo.getFindAll();
            res.json({
                success: true,
                data: vehiculos
            })
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
            response.id_vehiculo = uuidv4();
            if (response.patente_vehiculo.length < 3) return res.json({ success: false, msg: "patente invalida!!" })
            const [v, created] = await this.serviceVehiculo.postFindOrCreate(response, response.patente_vehiculo);
            if (created) {
                res.json({
                    success: true,
                    msg: " Vehiculo registrado exitosamente",
                });
                next();
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
            next();
        } catch (error) {
            sendError(error, res);
        }
    }


    async deleteVehiculo(req, res, next) {
        try {
            await this.serviceVehiculo.deleteDestroy(req.params.id);
            res.json({
                success: true,
                msg: " Vehiculo borrado exitosamente",
                data: req.params.id,
            });
            next();
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
            await this.serviceVehiculo.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: " imagen guardada",
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }




    async updateVehiculo(req, res, next) {
        try {
            const response = req.body;
            //recibira la id_vehiculo y no la patente
            const vehiculo = await this.serviceVehiculo.getFindOneById(req.params.id);
            if (response.patente_vehiculo.length < 3) return res.json({ success: false, msg: "patente invalida!!" })
            if (vehiculo.patente_vehiculo != response.patente_vehiculo) {
                await this.borrarDatosAsociados(vehiculo);
                try {
                    await this.serviceVehiculo.putUpdateById(response, req.params.id);
                } catch (error) {
                    console.log(error)
                    await this.agregarDatosAsociados(vehiculo, vehiculo.patente_vehiculo);
                    return res.json({ success: false, msg: "puede que la patente ya exista!" })
                }
                await this.agregarDatosAsociados(vehiculo, response.patente_vehiculo);
            } else {
                await this.serviceVehiculo.putUpdateById(response, req.params.id);
            }
            res.json({
                success: true,
                msg: "Vehiculo modificado exitosamente",
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }

    async borrarDatosAsociados(vehiculo) {
        if (vehiculo.tarifasVehiculo) await this.serviceTarifaVehiculo.putUpdateById({ patente_vehiculo: null }, vehiculo.tarifasVehiculo.id_tarifaVehiculo);
        if (vehiculo.arriendos.length > 0) await vehiculo.arriendos.map(async ({ id_arriendo }) => await this.serviceArriendo.putUpdate({ patente_vehiculo: null }, id_arriendo));
        if (vehiculo.danioVehiculos.length > 0) await vehiculo.danioVehiculos.map(async ({ id_danioVehiculo }) => await this.serviceDanio.putUpdate({ patente_vehiculo: null }, id_danioVehiculo));
    }

    async agregarDatosAsociados(vehiculo, newPatente) {
        if (vehiculo.tarifasVehiculo) await this.serviceTarifaVehiculo.putUpdateById({ patente_vehiculo: newPatente }, vehiculo.tarifasVehiculo.id_tarifaVehiculo);
        if (vehiculo.arriendos.length > 0) await vehiculo.arriendos.map(async ({ id_arriendo }) => await this.serviceArriendo.putUpdate({ patente_vehiculo: newPatente }, id_arriendo));
        if (vehiculo.danioVehiculos.length > 0) await vehiculo.danioVehiculos.map(async ({ id_danioVehiculo }) => await this.serviceDanio.putUpdate({ patente_vehiculo: newPatente }, id_danioVehiculo));
    }
}




module.exports = VehiculoController;