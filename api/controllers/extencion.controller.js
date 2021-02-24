class ExtendionController {

    constructor({ ExtencionService, sendError }) {
        this._serviceExtencion = ExtencionService;
        this.sendError = sendError;
    }

    async createExtencionArriendo(req, res, next) {
        try {

            console.log(req.body);
            const extencion = await this._serviceExtencion.postCreate(req.body);
            res.json({ success: true, data: extencion, msg: "extencion creada" });
            next()
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async buscarExtencionesPorArriendo(req, res) {
        try {
            const extenciones = await this._serviceExtencion.getFindAllWithArrindo(req.params.id);
            res.json({ success: true, data: extenciones });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = ExtendionController;

