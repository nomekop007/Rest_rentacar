const { fecha, hora } = require("../../helpers/components");
const recepcionPlantilla = require("../../utils/pdf_plantillas/recepcion")
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { borrarImagenDeStorage } = require("../../helpers/components");

class VehiculoController {

    constructor({ VehiculoService, SucursalRepository, ArriendoRepository, DanioVehiculoRepository, TarifaVehiculoRepository, ExtencionRepository, sendError }) {
        this._vehiculoService = VehiculoService;
        this.sendError = sendError;

        //mover
        this._serviceSucursal = SucursalRepository;
        this._serviceArriendo = ArriendoRepository;
        this._serviceDanioVehiculo = DanioVehiculoRepository;
        this._serviceTarifaVehiculo = TarifaVehiculoRepository;
        this._serviceExtencion = ExtencionRepository;
    }


    async getVehiculos(req, res) {
        try {
            const vehiculos = await this._vehiculoService.getVehiculos();
            res.json({ success: true, data: vehiculos, });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async getAllVehiculos(req, res) {
        try {
            const vehiculos = await this._vehiculoService.getAllVehiculos();
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
        }
    }

    async createDanioVehiculo(req, res) {
        try {
            const response = req.body;
            const arriendo = await this._serviceArriendo.getFindOne(response.id_arriendo);
            response.id_despacho = arriendo.id_arriendo;
            response.fecha = fecha();
            response.hora = hora();
            const docDefinition = await recepcionPlantilla(response);
            const nameFile = uuidv4();
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            const pathFile = path.join(__dirname, `${process.env.PATH_DANIO_VEHICULO}/${nameFile}.pdf`)
            pdfDocGenerator.getBase64((base64) => {
                fs.writeFileSync(pathFile, base64, "base64", (err) => {
                    res.json({
                        success: false,
                        msg: err
                    });
                    return;
                })
            });
            const data = {
                descripcion_danioVehiculo: response.descripcion_danio,
                documento_danioVehiculo: nameFile + ".pdf",
                id_arriendo: arriendo.id_arriendo,
                patente_vehiculo: arriendo.patente_vehiculo,
                estado_danioVehiculo: "PENDIENTE",
                userAt: response.userAt
            }
            await this._serviceDanioVehiculo.postCreate(data);
            res.json({
                success: true,
                msg: "daño registrado"
            })
        } catch (error) {
            this.sendError(error, req, res);;
        }
    }


    async consultarDanioVehiculo(req, res) {
        try {
            const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
            if (arriendo.danioVehiculos.length > 0) {
                res.json({
                    success: true,
                    data: true
                })
            } else {
                res.json({
                    success: true,
                    data: false
                })
            }
        } catch (error) {
            this.sendError(error, req, res);;
        }
    }


    async getDanioVehiculo(req, res) {
        try {
            const danios = await this._serviceDanioVehiculo.getFindAll();
            res.json({
                success: true,
                data: danios
            })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async updateDanioVehiculo(req, res, next) {
        try {
            const response = req.body;
            await this._serviceDanioVehiculo.putUpdate(response, req.params.id);
            await this._serviceDanioVehiculo.getFindByPk(req.params.id);
            res.json({
                success: true,
                msg: "estado daño actualizado",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);;
        }
    }

    async createTarifaVehiculo(req, res, next) {
        try {
            const { TARIFASVEHICULOS } = req.body;
            TARIFASVEHICULOS.forEach(async vehiculo => {
                vehiculo.userAt = req.body.userAt;
                const [tarifaVehiculo, created] = await this._serviceTarifaVehiculo.postFindOrCreate(vehiculo, vehiculo.patente_vehiculo);
                if (!created) await this._serviceTarifaVehiculo.putUpdate(vehiculo, vehiculo.patente_vehiculo);
            });
            res.json({
                success: true,
                msg: "asignacion exitosa!"
            })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async getTarifaVehiculo(req, res) {
        try {
            const tarifasVehiculos = await this._serviceTarifaVehiculo.getFindAll();
            res.json({
                success: true,
                data: tarifasVehiculos
            })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findTarifaVehiculoByDias(req, res) {
        try {
            const { patente, dias } = req.query;
            const tarifaVehiculo = await this._serviceTarifaVehiculo.getFindOne(patente);
            let valorDia = 0;
            let valorNeto = 0;
            if (tarifaVehiculo) {
                if (Number(dias) < 7) {
                    valorDia = tarifaVehiculo.valor_neto_diario;
                }
                if (Number(dias) >= 7) {
                    valorDia = tarifaVehiculo.valor_neto_semanal / 7;
                }
                if (Number(dias) >= 15) {
                    valorDia = tarifaVehiculo.valor_neto_quincenal / 15;
                }
                if (Number(dias) >= 30) {
                    valorDia = tarifaVehiculo.valor_neto_mensual / 30;
                }
                valorNeto = valorDia * Number(dias);
            }
            res.json({
                success: true,
                data: { valorDia, valorNeto }
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

}




module.exports = VehiculoController;