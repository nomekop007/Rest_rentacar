const sendError = require('../../../helpers/sendError');

class FinanzasController {

    constructor({ FinanzasService }) {
        this._finanzasService = FinanzasService;
    }


    async getArriendoFinanzas(req, res) {
        try {
            const arriendos = await this._finanzasService.getArriendoFinanzas();
            res.json({
                success: true,
                data: arriendos,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async findArriendoFinanzas(req, res) {
        try {
            const { id } = req.params;
            const arriendo = await this._finanzasService.findArriendoFinanzas(id);
            if (arriendo) {
                res.json({
                    success: true,
                    data: arriendo,
                });
            } else {
                res.json({
                    success: false,
                    msg: "error: " + "arriendo no encontrado",
                });
            }
        } catch (error) {
            sendError(error, req, res);
        }
    }



    async findDocumentosArriendoFinanzas(req, res) {
        try {
            const { documento, tipo } = req.body;
            const payload = await this._finanzasService.findDocumentosArriendoFinanzas(documento, tipo);
            res.json(payload);
        } catch (error) {
            sendError(error, req, res);
        }
    }
}

module.exports = FinanzasController;

