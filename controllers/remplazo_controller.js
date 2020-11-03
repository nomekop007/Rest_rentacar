const { Remplazo } = require("../db");
const { sendError } = require("../helpers/components");

class RemplazoController {
    async createRemplazo(req, res) {
        try {
            const response = req.body;
            const remplazo = await Remplazo.create(response);
            res.json({
                success: true,
                data: {
                    id_remplazo: remplazo.id_remplazo,
                },
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = RemplazoController;