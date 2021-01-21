const FacturacionService = require("../services/facturcion.service");
const { sendError } = require("../helpers/components");
class FacturacionController {
    constructor() {
        this.serviceFacturacion = new FacturacionService();
    }


    async getFacturacion(req, res) {
        try {
            const facturacion = await this.serviceFacturacion.getFindAll();
            res.json({
                success: true,
                data: facturacion,
            })
        } catch (error) {
            sendError(error, res);
        }
    }


    async createFacturacion(req, res, next) {
        try {
            const response = req.body;
            const facturacion = await this.serviceFacturacion.postCreate(response);
            res.json({
                success: true,
                data: facturacion,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }


    async uploadDocumentFacturacion(req, res, next) {
        try {
            const data = { documento_facturacion: req.file.filename };
            await this.serviceFacturacion.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: " documento guardada",
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = FacturacionController;