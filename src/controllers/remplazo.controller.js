const RemplazoService = require("../services/remplazo.service");
const { sendError } = require("../helpers/components");

class RemplazoController {

    constructor() {
        this._serviceRemplazo = new RemplazoService();
    }


    async createRemplazo(req, res, next) {
        try {
            const response = req.body;
            const remplazo = await this._serviceRemplazo.postCreate(response);
            res.json({
                success: true,
                data: {
                    id_remplazo: remplazo.id_remplazo,
                },
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = RemplazoController;