const { ActaEntrega, Arriendo, Vehiculo } = require("../db");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { v5: uuidv5 } = require("uuid");
const PdfPrinter = require("pdfmake");
const actaEntregaPlantilla = require("../utils/pdf_plantillas/actaEntrega");


class ActaEntregaController {
    async generatePDFactaEntrega(req, res) {
        try {
            const response = req.body;
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: response.id_arriendo },
                include: [
                    { model: Vehiculo, attributes: ["marca_vehiculo", "modelo_vehiculo", "año_vehiculo", "color_vehiculo", "patente_vehiculo"] },
                ],
            });
            response.vehiculo = arriendo.vehiculo;
            response.kilometraje = arriendo.kilometrosEntrada_arriendo;
            response.id_arriendo = arriendo.id_arriendo;
            response.fecha = fecha();
            response.hora = hora();

            if (arriendo.estado_arriendo === "FIRMADO") {
                const docDefinition = await actaEntregaPlantilla(response);
                const fonts = {
                    Roboto: {
                        normal: require.resolve("../utils/fonts/Roboto-Regular.ttf"),
                        bold: require.resolve("../utils/fonts/Roboto-Medium.ttf"),
                        italics: require.resolve("../utils/fonts/Roboto-Italic.ttf"),
                        bolditalics: require.resolve(
                            "../utils/fonts/Roboto-MediumItalic.ttf"
                        ),
                    },
                };
                //se genera un nombre combinado con la id del arriendo
                const nameFile = uuidv5("actaEntrega-" + arriendo.id_arriendo, uuidv5.URL);

                const printer = new PdfPrinter(fonts);
                const pdfDoc = printer.createPdfKitDocument(docDefinition);

                //se guarda el pdf en una ruta predeterminada
                pdfDoc.pipe(
                    fs.createWriteStream(
                        path.join(
                            __dirname,
                            "../uploads/documentos/actaEntrega/" + nameFile + ".pdf"
                        )
                    )
                );
                pdfDoc.end();

                setTimeout(() => {
                    res.json({
                        success: true,
                        data: {
                            nombre_documento: nameFile,
                            firma1: response.firma1PNG,
                            firma2: response.firma2PNG,
                        },
                    });
                }, 2000);
            } else {
                res.json({
                    success: false,
                    msg: "el arriendo ya esta despachado o no esta firmado!",
                });
            }
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async createActaEntrega(req, res, next) {
        try {
            const response = req.body;

            const actaEntrega = await ActaEntrega.create(response);
            res.json({
                success: true,
                data: actaEntrega,
            });
            next(actaEntrega.logging);
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

const fecha = () => {
    let f = new Date();
    return moment(f).format("DD-MM-YYYY");
}

const hora = () => {
    let f = new Date();
    return moment(f).format("HH:mm:ss a");
}

module.exports = ActaEntregaController;