const { Accesorio } = require("../database/db");

class AccesorioService {

    async getFindAll() {
        return await Accesorio.findAll({
            order: [
                ['id_accesorio', 'DESC'],
            ]
        });
    }

}


module.exports = AccesorioService;