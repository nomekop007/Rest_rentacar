const { Garantia } = require("../database/db");

class GarantiaService {

    async postCreate(DATA) {
        return await Garantia.create(DATA);
    }

}

module.exports = GarantiaService;