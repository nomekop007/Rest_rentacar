const { Rol } = require("../database/db");

class RolService {

    async getFindAll() {
        return await Rol.findAll();
    }


    async postCreate(DATA) {
        return await Rol.create(DATA);
    }


    async putUpdate(DATA, ID) {
        return await Rol.update(DATA, {
            where: { id_rol: ID }
        })
    }


    async getFindByPk(ID) {
        return await Rol.findByPk(ID);
    }

}

module.exports = RolService;