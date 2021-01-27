const { Despacho } = require("../database/db");

class DespachoService {

    async postCreate(DATA) {
        return await Despacho.create(DATA);
    }

    async putUpdate(DATA, ID) {
        return await Despacho.update(DATA, {
            where: { id_despacho: ID },
        });
    }


}

module.exports = DespachoService;