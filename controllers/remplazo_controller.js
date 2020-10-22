const { Remplazo } = require("../db");

class RemplazoController {
    async createRemplazo(req, res, next) {
        try {
            const response = req.body;
            const remplazo = await Remplazo.create(response);
            res.json({
                success: true,
                data: {
                    id_remplazo: remplazo.id_remplazo,
                },
            });
            next(remplazo.logging);
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

module.exports = RemplazoController;