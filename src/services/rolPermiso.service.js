const { RolPermiso } = require("../database/db");


class RolPermisoService {

    async getFindAll() {
        return await RolPermiso.findAll();
    }

    async postCreate(DATA) {
        return await RolPermiso.create(DATA);
    }

    async putUpdate(DATA, ID) {
        return await RolPermiso.update(DATA, {
            where: { id_rolPermiso: ID }
        });
    }

    async getFindByPk(ID) {
        return await RolPermiso.findByPk(ID);
    }

}


module.exports = RolPermisoService;