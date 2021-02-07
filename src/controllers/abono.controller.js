
const { sendError } = require('../helpers/components');
const AbonoService = require('../services/abono.service');

class AbonoController {

    constructor() {
        this._serviceAbono = new AbonoService();
    }


    async createAbonoWithFacturacion(req, res, next) {
        try {
            console.log(req.body)
            const abono = await this._serviceAbono.postCreateWithFacturacion(req.body);
            res.json({ success: true, data: abono, msg: "abono creado" })
            next();
        } catch (error) {
            sendError(error, req, res)
        }
    }

}


module.exports = AbonoController;
