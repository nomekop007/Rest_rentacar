class FacturacionController {

    constructor({ FacturacionRepository, sendError }) {
        this._serviceFacturacion = FacturacionRepository;
        this.sendError = sendError;
    }


    async getFacturacion(req, res) {
        try {
            const facturacion = await this._serviceFacturacion.getFindAll();
            res.json({
                success: true,
                data: facturacion,
            })
        } catch (error) {
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
        }
    }


}

module.exports = FacturacionController;