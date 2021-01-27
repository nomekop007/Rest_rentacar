const RegionService = require("../services/regiones.service");
const { sendError } = require('../helpers/components');
class RegionController {

    constructor() {
        this._serviceRegion = new RegionService();
    }


    async getRegiones(req, res) {
        try {
            const regiones = await this._serviceRegion.getFindAll();
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