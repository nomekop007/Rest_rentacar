const { Accesorio } = require("../database/db");
const { sendError } = require("../helpers/components");

class AccesorioController {
    async getAccesorios(req, res) {
        try {
            const accesorio = await Accesorio.findAll();
            res.json({
                success: true,
                data: accesorio,
            });
        } catch (error) {
            sendError(error, res);
        }
    }

}

module.exports = AccesorioController;