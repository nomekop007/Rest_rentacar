const { Contrato } = require("../database/db");

class ContratoService {

    async postCreate(DATA) {
        return await Contrato.create(DATA);
    }


}

module.exports = ContratoService;