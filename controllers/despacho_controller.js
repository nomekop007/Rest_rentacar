const { Despacho } = require("../db");
const { sendError } = require("../helpers/components");

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
}

module.exports = DespachoController;