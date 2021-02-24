class PagoDanioController {

    constructor({ PagoDanioRepository, sendError }) {
        this._servicePagoDanio = PagoDanioRepository;
        this.sendError = sendError;
    }


    async createPagoDanio(req, res, next) {
        try {
            const response = req.body;
            const pagoDanio = await this._servicePagoDanio.postCreate(response);
            res.json({
                success: true,
                data: { id_pagoDanio: pagoDanio.id_pagoDanio }
            })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}


module.exports = PagoDanioController;