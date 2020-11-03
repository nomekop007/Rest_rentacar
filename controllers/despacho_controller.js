const { Despacho } = require("../db");

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
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }
}

module.exports = DespachoController;