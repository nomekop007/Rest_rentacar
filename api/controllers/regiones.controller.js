class RegionController {

    constructor({ RegionService, sendError }) {
        this._serviceRegion = RegionService;
        this.sendError = sendError;
    }


    async getRegiones(req, res) {
        try {
            const regiones = await this._serviceRegion.getFindAll();
            res.json({
                success: true,
                data: regiones
            })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}


module.exports = RegionController;