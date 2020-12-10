const { Despacho } = require("../database/db");
const { sendError, fecha, hora } = require("../helpers/components");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const recepcionPlantilla = require("../utils/pdf_plantillas/recepcion")
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class DespachoController {
    async createDespacho(req, res, next) {
        try {
            const response = req.body;
            const despacho = await Despacho.create(response);
            res.json({
                success: true,
                id_despacho: despacho.id_despacho,
            });

            next(despacho.logging);
        } catch (error) {
            sendError(error, res);
        }
    }

    async addRevision(req, res, next) {
        try {
            const response = req.body;
            response.id_despacho = req.params.id;
            response.fecha = fecha();
            response.hora = hora();
            const docDefinition = await recepcionPlantilla(response);
            const nameFile = uuidv4();
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            const pathFile = path.join(__dirname, `${process.env.PATH_RECEPCIONES}/${nameFile}.pdf`)
            pdfDocGenerator.getBase64((base64) => {
                fs.writeFileSync(pathFile, base64, "base64", (err) => {
                    res.json({
                        success: false,
                        msg: err
                    });
                    return;
                })
            });
            const despacho = await Despacho.update({
                revision_recepcion: nameFile
            }, {
                where: { id_despacho: req.params.id },
            });
            res.json({
                success: true,
                msg: "revision existosa"
            });
            next(despacho.logging)
        } catch (error) {
            sendError(error)
        }
    }
}

module.exports = DespachoController;