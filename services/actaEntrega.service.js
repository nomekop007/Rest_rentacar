const { ActaEntrega } = require("../database/db");

class ActaEntregaService {

    async postCreate(DATA) {
        return await ActaEntrega.create(DATA);
    }


    async getFindOneByIDdespacho(ID_DESPACHO) {
        return await ActaEntrega.findOne({
            where: { id_despacho: ID_DESPACHO }
        });
    }


}


module.exports = ActaEntregaService;