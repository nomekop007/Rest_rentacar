class RegionController {

    constructor({ RegionService, RegionRepository, sendError }) {
        this.sendError = sendError;
        this._regionService = RegionService;

        //mover
        this._serviceRegion = RegionRepository;
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