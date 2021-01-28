const FacturacionService = require("../services/facturcion.service");
const { sendError } = require("../helpers/components");
class FacturacionController {
    constructor() {
        this._serviceFacturacion = new FacturacionService();
    }


    async getFacturacion(req, res) {
        try {
            const facturacion = await this._serviceFacturacion.getFindAll();
            res.json({
                success: true,
                data: facturacion,
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async createFacturacion(req, res, next) {
        try {
            const response = req.body;
            const facturacion = await this._serviceFacturacion.postCreate(response);
            res.json({
                success: true,
                data: facturacion,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async uploadDocumentFacturacion(req, res, next) {
        try {
            const data = { documento_facturacion: req.file.filename };
            await this._serviceFacturacion.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: " documento guardada",
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = FacturacionController;