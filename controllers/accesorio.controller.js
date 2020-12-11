const { sendError } = require("../helpers/components");
const AccesoriosService = require("../services/accesorios.service");

class AccesorioController {
    constructor() {
        this.service = new AccesoriosService();
    }

    async getAccesorios(req, res) {
        try {
            const accesorios = await this.service.getFindAll();
            res.json({
                success: true,
                data: accesorios,
            });
        } catch (error) {
            sendError(error, res);
        }
    }

}

module.exports = AccesorioController;