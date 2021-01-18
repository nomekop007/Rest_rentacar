const DanioVehiculoService = require("../services/danioVehiculo.service");
const ArriendoService = require("../services/arriendo.service");
const { sendError, fecha, hora } = require("../helpers/components");
const recepcionPlantilla = require("../utils/pdf_plantillas/recepcion")
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class DanioVehiculoController {
    constructor() {
        this.serviceArriendo = new ArriendoService();
        this.serviceDanioVehiculo = new DanioVehiculoService();
    }


    async createDanioVehiculo(req, res) {
        try {
            const response = req.body;
            const arriendo = await this.serviceArriendo.getFindOne(response.id_arriendo);
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
            await this.serviceDanioVehiculo.postCreate(data);
            res.json({
                success: true,
                msg: "daño registrado"
            })
        } catch (error) {
            sendError(error);
        }
    }


    async consultarDanioVehiculo(req, res) {
        try {
            const arriendo = await this.serviceArriendo.getFindOne(req.params.id);
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
            sendError(error);
        }
    }


    async getDanioVehiculo(req, res) {
        try {
            const danios = await this.serviceDanioVehiculo.getFindAll();
            res.json({
                success: true,
                data: danios
            })
        } catch (error) {
            sendError(error)
        }
    }


    async updateDanioVehiculo(req, res) {
        try {
            const response = req.body;
            await this.serviceDanioVehiculo.putUpdate(response, req.params.id);
            const danioVehiculo = await this.serviceDanioVehiculo.getFindByPk(req.params.id);
            //  const data = { estado_arriendo: "FINALIZADO" };
            // await this.serviceArriendo.putUpdate(data, danioVehiculo.id_arriendo);
            res.json({
                success: true,
                msg: "estado daño actualizado",
            });
        } catch (error) {
            sendError(error);
        }
    }



}

module.exports = DanioVehiculoController;



