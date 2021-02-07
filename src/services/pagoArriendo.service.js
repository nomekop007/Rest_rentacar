const { PagoArriendo } = require("../database/db");

class PagoArriendoService {

    async putUpdate(DATA, ID) {
        return await PagoArriendo.update(DATA, {
            where: { id_pagoArriendo: ID }
        });
    }

    async postCreate(DATA) {
        return await PagoArriendo.create(DATA);
    }

    async deleteByIDarriendo(ID) {
        return await PagoArriendo.destroy({
            where: { id_arriendo: ID },
        })
    }

}

module.exports = PagoArriendoService;