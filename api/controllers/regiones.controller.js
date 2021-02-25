class RegionController {

    constructor({ RegionRepository, sendError }) {
        this.sendError = sendError;

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