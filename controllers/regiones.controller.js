const RegionService = require("../services/regiones.service");
const { sendError } = require('../helpers/components');
class RegionController {

    constructor() {
        this.serviceRegion = new RegionService();
    }


    async getRegiones(req, res) {
        try {
            const regiones = await this.serviceRegion.getFindAll();
            res.json({
                success: true,
                data: regiones
            })
        } catch (error) {
            sendError(error);
        }
    }


}


module.exports = RegionController;