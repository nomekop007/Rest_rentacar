const { v4: uuidv4 } = require("uuid");
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
            const { sucursal, rol } = req.query;
            const { id_region } = await this._serviceSucursal.getFindOne(sucursal);
            let vehiculos = null;
            if (rol === 1) vehiculos = await this._serviceVehiculo.getFindAll();
            else vehiculos = await this._serviceVehiculo.getFindAllWithRegion(id_region);


            vehiculos.map(({ id_vehiculo, patente_vehiculo }) => {
                if (!id_vehiculo) {
                    setTimeout(async () => {
                        await this._serviceVehiculo.putUpdate({ id_vehiculo: uuidv4() }, patente_vehiculo);
                        console.log(patente_vehiculo)
                    }, 1000);
                }
            })

            res.json({
                success: true,
                data: vehiculos,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async getAllVehiculos(req, res) {
        try {
            const vehiculos = await this._serviceVehiculo.getFindAll();
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
            const vehiculo = await this._serviceVehiculo.getFindOne(req.params.id);
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
            const response = req.body;
            response.id_vehiculo = uuidv4();
            if (response.patente_vehiculo.length < 3) return res.json({ success: false, msg: "patente invalida!!" })
            const [v, created] = await this._serviceVehiculo.postFindOrCreate(response, response.patente_vehiculo);
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
            this.sendError(error, req, res);
        }
    }


    async updateStateVehiculo(req, res, next) {
        try {
            const response = req.body;
            if (response.kilometrosMantencion_vehiculo == null) delete response.kilometrosMantencion_vehiculo;
            const vehiculo = await this._serviceVehiculo.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "Vehiculo modificado exitosamente",
                data: vehiculo,
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async deleteVehiculo(req, res, next) {
        try {
            await this._serviceVehiculo.deleteDestroy(req.params.id);
            res.json({
                success: true,
                msg: " Vehiculo borrado exitosamente",
                data: req.params.id,
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async uploadImageVehiculo(req, res, next) {
        try {
            const v = await this._serviceVehiculo.getFindOne(req.params.id);
            // se pregunta si el vehiculo  tiene image asignada
            if (v.foto_vehiculo) borrarImagenDeStorage(v.foto_vehiculo, process.env.PATH_FOTO_VEHICULO);
            const data = { foto_vehiculo: req.file.filename };
            await this._serviceVehiculo.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: " imagen guardada",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async updateVehiculo(req, res, next) {
        /* IMPORTANTE !!!!  SI EL VEHICULO TIENE UNA NUEVA ASOCIACION CON OTRA TABLA , SE TIENE 
           QUE AGREGAR LOS SCRIPT CORRESPONDIENTES A LOS METODOS borrarDatosAsociados() y agregarDatosAsociados() */
        try {
            const response = req.body;
            const vehiculo = await this._serviceVehiculo.getFindOneById(req.params.id);
            if (response.patente_vehiculo.length < 3) return res.json({ success: false, msg: "patente invalida!!" })
            if (vehiculo.patente_vehiculo != response.patente_vehiculo) {
                await this.borrarDatosAsociados(vehiculo);
                try {
                    await this._serviceVehiculo.putUpdateById(response, req.params.id);
                } catch (error) {
                    console.log(error)
                    await this.agregarDatosAsociados(vehiculo, vehiculo.patente_vehiculo);
                    return res.json({ success: false, msg: "puede que la patente ya exista!" })
                }
                await this.agregarDatosAsociados(vehiculo, response.patente_vehiculo);
            } else {
                await this._serviceVehiculo.putUpdateById(response, req.params.id);
            }
            res.json({
                success: true,
                msg: "Vehiculo modificado exitosamente",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async borrarDatosAsociados(vehiculo) {
        if (vehiculo.tarifasVehiculo) await this._serviceTarifaVehiculo.putUpdateById({ patente_vehiculo: null }, vehiculo.tarifasVehiculo.id_tarifaVehiculo);
        if (vehiculo.arriendos.length > 0) await vehiculo.arriendos.map(async ({ id_arriendo }) => await this._serviceArriendo.putUpdate({ patente_vehiculo: null }, id_arriendo));
        if (vehiculo.danioVehiculos.length > 0) await vehiculo.danioVehiculos.map(async ({ id_danioVehiculo }) => await this._serviceDanioVehiculo.putUpdate({ patente_vehiculo: null }, id_danioVehiculo));
        if (vehiculo.extenciones.length > 0) await vehiculo.extenciones.map(async ({ id_extencion }) => await this._serviceExtencion.putUpdateById({ patente_vehiculo: null }, id_extencion));
    }

    async agregarDatosAsociados(vehiculo, newPatente) {
        if (vehiculo.tarifasVehiculo) await this._serviceTarifaVehiculo.putUpdateById({ patente_vehiculo: newPatente }, vehiculo.tarifasVehiculo.id_tarifaVehiculo);
        if (vehiculo.arriendos.length > 0) await vehiculo.arriendos.map(async ({ id_arriendo }) => await this._serviceArriendo.putUpdate({ patente_vehiculo: newPatente }, id_arriendo));
        if (vehiculo.danioVehiculos.length > 0) await vehiculo.danioVehiculos.map(async ({ id_danioVehiculo }) => await this._serviceDanioVehiculo.putUpdate({ patente_vehiculo: newPatente }, id_danioVehiculo));
        if (vehiculo.extenciones.length > 0) await vehiculo.extenciones.map(async ({ id_extencion }) => await this._serviceExtencion.putUpdateById({ patente_vehiculo: newPatente }, id_extencion));
    }
}




module.exports = VehiculoController;