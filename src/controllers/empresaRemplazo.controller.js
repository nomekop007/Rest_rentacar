const EmpresaRemplazoService = require('../services/empresaRemplazo.service');
const { sendError } = require("../helpers/components");

class EmpresaRemplazoController {
    constructor() {
        this._serviceEmpresaRemplazo = new EmpresaRemplazoService();
    }


    async getEmpresasRemplazo(req, res) {
        try {
            const empresasRemplazo = await this._serviceEmpresaRemplazo.getFindAll();
            res.json({
                success: true,
                data: empresasRemplazo,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = EmpresaRemplazoController;