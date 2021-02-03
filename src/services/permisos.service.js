const { Permiso } = require("../database/db");

class PermisoService {

    async getFindAll() {
        return await Permiso.findAll();
    }

    async postCreate(DATA) {
        return await Permiso.create(DATA);
    }

    async putUpdate(DATA, ID) {
        return await Permiso.update(DATA, {
            where: { id_permiso: ID }
        })
    }

    async getFindByPk(ID) {
        return await Permiso.findByPk(ID);
    }


}

module.exports = PermisoService;