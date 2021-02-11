const { Contrato } = require("../config/database/db");

class ContratoService {

    async postCreate(DATA) {
        return await Contrato.create(DATA);
    }

    async deleteByIDArriendo(ID) {
        return await Contrato.destroy({
            where: { id_arriendo: ID }
        });
    }


}

module.exports = ContratoService;