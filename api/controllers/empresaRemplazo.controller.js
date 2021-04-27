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

    async getAllTarifasPorEmpresa(req, res, next) {
        try {
            const { id } = req.params;
            const tarifasporEmpresa = await this._empresaRemplazoService.getAllTarifasPorEmpresa(id);
            res.json({
                success: true,
                data: tarifasporEmpresa
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

        async updateTarifasEmpresaReemplazo(req, res, next) {
        try {
            const { id } = req.params;
            const DATA = req.body;
            const tarifasporEmpresa = await this._empresaRemplazoService.updateTarifasEmpresaReemplazo(id,DATA);
            res.json({
                success: true,
                data: tarifasporEmpresa
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async createTarifaEmpresaReemplazo(req, res, next) {
        try {
            const tarifa = req.body;
            const TarifaResponse = await this._empresaRemplazoService.createTarifaEmpresaReemplazo(tarifa);
            res.json({
                success: true
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async getAllTarifasEmpresasRemplazo(req, res) {
        try {
            const tarifasEmpresasRemplazo = await this._empresaRemplazoService.findAll();
            res.json({ success: true, data: tarifasEmpresasRemplazo });
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = EmpresaRemplazoController;