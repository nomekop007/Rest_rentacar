const { Extencion } = require("../database/db");

class ExtencionService {

    async postCreate(DATA) {
        return await Extencion.create(DATA);
    }

    async getFindAllWithArrindo(ID) {
        return await Extencion.findAll({
            where: { id_arriendo: ID }
        });
    }

}

module.exports = ExtencionService;