const { Garantia } = require("../database/db");

class GarantiaService {

    async postCreate(DATA) {
        return await Garantia.create(DATA);
    }

    async deleteByIDarriendo(ID) {
        return await Garantia.destroy({
            where: { id_arriendo: ID }
        })
    }

}

module.exports = GarantiaService;