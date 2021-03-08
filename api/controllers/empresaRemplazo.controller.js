const sendError = require('../../helpers/sendError');


class EmpresaRemplazoController {

    constructor({ EmpresaRemplazoService }) {
        this._empresaRemplazoService = EmpresaRemplazoService;
    }


    async getEmpresasRemplazo(req, res) {
        try {
            const empresasRemplazo = await this._empresaRemplazoService.getEmpresasRemplazo();
            res.json({ success: true, data: empresasRemplazo });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createRemplazo(req, res, next) {
        try {
            const remplazo = req.body;
            const remplazoRepo = await this._empresaRemplazoService.createRemplazo(remplazo);
            res.json({
                success: true,
                data: {
                    id_remplazo: remplazoRepo.id_remplazo,
                },
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = EmpresaRemplazoController;