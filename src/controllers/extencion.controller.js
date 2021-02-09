const ExtencionService = require('../services/extencion.service');
const { sendError } = require('../helpers/components');


class ExtendionController {

    constructor() {
        this._serviceExtencion = new ExtencionService();
    }

    async createExtencionArriendo(req, res, next) {
        try {

            console.log(req.body);
            const extencion = await this._serviceExtencion.postCreate(req.body);
            res.json({ success: true, data: extencion, msg: "extencion creada" });
            next()
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async buscarExtencionesPorArriendo(req, res) {
        try {
            const extenciones = await this._serviceExtencion.getFindAllWithArrindo(req.params.id);
            res.json({ success: true, data: extenciones });
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = ExtendionController;

