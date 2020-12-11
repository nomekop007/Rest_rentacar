const { ActaEntrega } = require("../database/db");

class ActaEntregaServices {

    async create(data) {
        const actaEntrega = await ActaEntrega.create(data)
        return actaEntrega;
    }



}


module.exports = ActaEntregaServices;