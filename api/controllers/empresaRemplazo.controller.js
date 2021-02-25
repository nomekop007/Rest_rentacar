class EmpresaRemplazoController {

    constructor({ EmpresaRemplazoRepository, RemplazoRepository, sendError }) {
        this.sendError = sendError;

        //mover
        this._serviceRemplazo = RemplazoRepository;
        this._serviceEmpresaRemplazo = EmpresaRemplazoRepository;
    }


    async getEmpresasRemplazo(req, res) {
        try {
            const empresasRemplazo = await this._serviceEmpresaRemplazo.getFindAll();
            res.json({
                success: true,
                data: empresasRemplazo,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
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

module.exports = EmpresaRemplazoController;