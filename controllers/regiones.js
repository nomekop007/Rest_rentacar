const { Region } = require("../database/db");
const { sendError } = require('../helpers/components');

class RegionController {

    async getRegiones(req, res) {
        try {
            const regiones = await Region.findAll();
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