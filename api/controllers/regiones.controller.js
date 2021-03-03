class RegionController {

    constructor({ RegionService, sendError }) {
        this.sendError = sendError;
        this._regionService = RegionService;
    }


    async getRegiones(req, res) {
        try {
            const regiones = await this._regionService.getRegiones();
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