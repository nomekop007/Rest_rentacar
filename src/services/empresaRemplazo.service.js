const { EmpresaRemplazo } = require("../database/db");

class EmpresaRemplazoService {

    async getFindAll() {
        return await EmpresaRemplazo.findAll();
    }

}

module.exports = EmpresaRemplazoService;