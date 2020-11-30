const { DanioVehiculo, Arriendo } = require('../database/db');
const { sendError, fecha, hora } = require("../helpers/components");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const recepcionPlantilla = require("../utils/pdf_plantillas/recepcion")
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class DanioVehiculoController {

    async createDanioVehiculo(req, res) {
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
            const pathFile = path.join(__dirname, `../uploads/fotosDañoVehiculo/${nameFile}.pdf`)

            pdfDocGenerator.getBase64((base64) => {
                fs.writeFileSync(pathFile, base64, "base64", (err) => {
                    res.json({
                        success: false,
                        msg: err
                    });
                    return;
                })
            });

            await DanioVehiculo.create({
                descripcion_danioVehiculo: response.descripcion_danio,
                documento_danioVehiculo: nameFile,
                id_arriendo: arriendo.id_arriendo,
                patente_vehiculo: arriendo.patente_vehiculo,
                userAt: response.userAt
            })



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

}

module.exports = DanioVehiculoController;



