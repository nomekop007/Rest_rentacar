const { FotoDespacho } = require("../config/database/db");

class FotoDespachoService {

    async getFindAllByArriendo(ID) {
        return await FotoDespacho.findAll({
            where: { id_arriendo: ID }
        });
    }


    async postCreate(DATA) {
        return await FotoDespacho.create(DATA);
    }


    async putUpdate(DATA, ID) {
        return await FotoDespacho.update(DATA, {
            where: { id_fotoDespacho: ID },
        });
    }


    async getFindByPk(ID) {
        return await FotoDespacho.findByPk(ID);
    }

    async deleteByIdArriendo(ID) {
        return await FotoDespacho.destroy({
            where: { id_arriendo: ID }
        })
    }

}


module.exports = FotoDespachoService;