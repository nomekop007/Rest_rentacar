const { Despacho } = require("../database/db");
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

    async addRevision(req, res) {
        try {
            const response = req.body;
            console.log(req.params.id);
            console.log(response);

            //CREAR DOC CON LAS IMAGENES
            // UPDATE DESPACHO CON EL NOMBRE DEL DOC

            res.json({
                success: true,
                msg: "llegooo"
            });
        } catch (error) {
            sendError(error)
        }

    }
}

module.exports = DespachoController;