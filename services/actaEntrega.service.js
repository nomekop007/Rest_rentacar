const { ActaEntrega } = require("../database/db");

class ActaEntregaServices {

    async postCreate(DATA) {
        const actaEntrega = await ActaEntrega.create(DATA);
        return actaEntrega;
    }

    async getFindOneByIDdespacho(ID_DESPACHO) {
        const actaEntrega = await ActaEntrega.findOne({
            where: { id_despacho: ID_DESPACHO }
        });
        return actaEntrega;
    }



}


module.exports = ActaEntregaServices;