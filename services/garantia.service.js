const { Garantia } = require("../database/db");

class GarantiaService {

    async postCreate(DATA) {
        await Garantia.create(DATA);
    }

}

module.exports = GarantiaService;