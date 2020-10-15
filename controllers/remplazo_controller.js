const { Remplazo } = require("../db");

class RemplazoController {
    async createRemplazo(req, res) {
        const response = req.body;
        const remplazo = await Remplazo.create(response);
        res.json({
            success: true,
            id_remplazo: remplazo.id_remplazo,
        });
    }
}

module.exports = RemplazoController;