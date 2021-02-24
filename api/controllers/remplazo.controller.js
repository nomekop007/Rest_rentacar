class RemplazoController {

    constructor({ RemplazoRepository, sendError }) {
        this._serviceRemplazo = RemplazoRepository;
        this.sendError = sendError;
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
            this.sendError(error, req, res);
        }
    }


}

module.exports = RemplazoController;