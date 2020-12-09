const { PagoDanio } = require("../database/db");
const { sendError } = require("../helpers/components")

class PagoDanioController {
    async createPagoDanio(req, res, next) {
        try {
            const response = req.body;
            console.log(response);
            const pagoDanio = await PagoDanio.create(response);
            res.json({
                success: true,
                data: {
                    id_pagoDanio: pagoDanio.id_pagoDanio
                }
            })
            next(pagoDanio.logging);

        } catch (error) {
            sendError(error)
        }
    }


    async uploadComprobante(req, res) {
        try {

            console.log(req.file);

            await PagoDanio.update({ comprobante_pagoDanio: req.file.filename }, {
                where: { id_pagoDanio: req.params.id }
            })

            res.json({
                success: true,
                msg: " documento guardado",
            });

        } catch (error) {
            sendError(error)
        }
    }

}


module.exports = PagoDanioController;