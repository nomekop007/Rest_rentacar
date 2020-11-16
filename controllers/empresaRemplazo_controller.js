const { EmpresaRemplazo } = require("../database/db");
const { sendError } = require("../helpers/components");

class EmpresaRemplazoController {
    async getEmpresasRemplazo(req, res) {
        try {
            const empresasRemplazo = await EmpresaRemplazo.findAll();
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