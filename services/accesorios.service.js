const { Accesorio } = require("../database/db");

class AccesorioService {

    async getFindAll() {
        const accesorio = await Accesorio.findAll({
            order: [
                ['id_accesorio', 'DESC'],
            ]
        });
        return accesorio;
    }

}


module.exports = AccesorioService;