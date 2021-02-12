const { Requisito } = require("../config/database/db");

class RequisitoService {

    async postCreate(DATA) {
        return await Requisito.create(DATA);
    }

    async deleteByIdArriendo(ID) {
        return await Requisito.destroy({
            where: { id_arriendo: ID }
        })
    }


}

module.exports = RequisitoService;