class RegionController {

    constructor({ RegionRepository, sendError }) {
        this._serviceRegion = RegionRepository;
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