const { Remplazo } = require("../db");

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
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }
}

module.exports = RemplazoController;