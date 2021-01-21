const PagoDanioService = require("../services/pagoDanio.service");
const { sendError } = require("../helpers/components")
class PagoDanioController {
    constructor() {
        this.servicePagoDanio = new PagoDanioService();
    }


    async createPagoDanio(req, res, next) {
        try {
            const response = req.body;
            const pagoDanio = await this.servicePagoDanio.postCreate(response);
            res.json({
                success: true,
                data: { id_pagoDanio: pagoDanio.id_pagoDanio }
            })
            next();
        } catch (error) {
            sendError(error)
        }
    }


}


module.exports = PagoDanioController;