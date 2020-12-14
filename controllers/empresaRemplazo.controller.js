const EmpresaRemplazoService = require('../services/empresaRemplazo.service');
const { sendError } = require("../helpers/components");

class EmpresaRemplazoController {
    constructor() {
        this.serviceEmpresaRemplazo = new EmpresaRemplazoService();
    }


    async getEmpresasRemplazo(req, res) {
        try {
            const empresasRemplazo = await this.serviceEmpresaRemplazo.getFindAll();
            res.json({
                success: true,
                data: empresasRemplazo,
            });
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = EmpresaRemplazoController;