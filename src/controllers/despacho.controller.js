const DespachoService = require("../services/despacho.service");
const { sendError, fecha, hora } = require("../helpers/components");
const recepcionPlantilla = require("../utils/pdf_plantillas/recepcion")
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class DespachoController {
    constructor() {
        this._serviceDespacho = new DespachoService();
    }


    async createDespacho(req, res) {
        try {
            const response = req.body;
            console.log(response);
            const despacho = await this._serviceDespacho.postCreate(response);
            res.json({
                success: true,
                id_despacho: despacho.id_despacho,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async addRevision(req, res) {
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
            const data = { revision_recepcion: `${nameFile}.pdf` };
            await this._serviceDespacho.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: "revision existosa"
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }
}

module.exports = DespachoController;