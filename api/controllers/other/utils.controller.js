const sendError = require('../../../helpers/sendError');

class UtilsController {

    constructor({ UtilsService }) {
        this._utilsService = UtilsService;
    }


    async findDocumento(req, res) {
        try {
            const { documento, tipo } = req.body;
            const payload = await this._utilsService.findDocumento(documento, tipo);
            res.json(payload);
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async rollbackVistaFirma(req, res) {
        try {
            const { id } = req.params;
            const response = await this._utilsService.rollbackVistaFirma(id);
            if (response) {
                res.json({ success: true, msg: "hecho!" })
            } else {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
            }
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async rollbackVistaPago(req, res) {
        try {
            const { id } = req.params;
            const response = await this._utilsService.rollbackVistaPago(id);
            if (response) {
                res.json({ success: true, msg: "hecho!" })
            } else {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
            }
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async rollbackVistaRequisito(req, res) {
        try {
            const { id } = req.params;
            const response = await this._utilsService.rollbackVistaRequisito(id);
            if (response) {
                res.json({ success: true, msg: "hecho!" })
            } else {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
            }
        } catch (error) {
            sendError(error, req, res);
        }
    }


}


module.exports = UtilsController;