const { Accesorio, Sucursal } = require("../config/database/db");

class AccesorioService {

    async getFindAll() {
        return await Accesorio.findAll({
            include: [{ model: Sucursal }],
            order: [
                ['id_accesorio', 'DESC'],
            ]
        });
    }

    async getFindAllBySucursal(ID) {
        return await Accesorio.findAll({
            where: { id_sucursal: ID },
            include: [{ model: Sucursal }]
        })
    }

    async postCreate(DATA) {
        return await Accesorio.create(DATA);
    }

    async putUpdate(DATA, ID) {
        return await Accesorio.update(DATA, {
            where: { id_accesorio: ID },
        });
    }

    async getFindByPk(ID) {
        return await Accesorio.findByPk(ID);
    }

}


module.exports = AccesorioService;