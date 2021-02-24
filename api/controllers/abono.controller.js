class AbonoController {

    constructor({ AbonoRepository, sendError }) {
        this._serviceAbono = AbonoRepository;
        this.sendError = sendError;
    }


    async createAbonoWithFacturacion(req, res, next) {
        try {
            const abono = await this._serviceAbono.postCreateWithFacturacion(req.body);
            res.json({ success: true, data: abono, msg: "abono creado" })
            next();
        } catch (error) {
            this.sendError(error, req, res)
        }
    }

}


module.exports = AbonoController;
