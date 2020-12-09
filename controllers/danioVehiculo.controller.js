const { DanioVehiculo, Arriendo, Vehiculo, PagoDanio, Empresa, Cliente, Remplazo, Facturacion } = require('../database/db');
const { sendError, fecha, hora } = require("../helpers/components");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const recepcionPlantilla = require("../utils/pdf_plantillas/recepcion")
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class DanioVehiculoController {

    async createDanioVehiculo(req, res, next) {
        try {
            const response = req.body;
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: response.id_arriendo },
            });
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
            const danioVehiculo = await DanioVehiculo.create({
                descripcion_danioVehiculo: response.descripcion_danio,
                documento_danioVehiculo: nameFile + ".pdf",
                id_arriendo: arriendo.id_arriendo,
                patente_vehiculo: arriendo.patente_vehiculo,
                estado_danioVehiculo: "PENDIENTE",
                userAt: response.userAt
            })
            res.json({
                success: true,
                msg: "daño registrado"
            })
            next(danioVehiculo.logging);
        } catch (error) {
            sendError(error);
        }
    }


    async consultarDanioVehiculo(req, res) {
        try {
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: req.params.id },
                include: {
                    model: DanioVehiculo
                }
            });
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
            const danios = await DanioVehiculo.findAll({
                include: [
                    { model: Arriendo, include: [{ model: Empresa }, { model: Cliente }, { model: Remplazo, include: { model: Cliente } }] },
                    { model: Vehiculo },
                    { model: PagoDanio, include: { model: Facturacion } }]
            });
            res.json({
                success: true,
                data: danios
            })
        } catch (error) {
            sendError(error)
        }
    }


    async updateDanioVehiculo(req, res, next) {
        try {
            const response = req.body;
            const danioVehiculo = await DanioVehiculo.update(response, {
                where: { id_danioVehiculo: req.params.id },
            });
            const d = await DanioVehiculo.findByPk(req.params.id);
            await Arriendo.update({ estado_arriendo: "FINALIZADO" }, {
                where: { id_arriendo: d.id_arriendo }
            })
            res.json({
                success: true,
                msg: "estado daño actualizado",
            });
            next(danioVehiculo.logging);
        } catch (error) {
            sendError(error);
        }
    }
}

module.exports = DanioVehiculoController;



