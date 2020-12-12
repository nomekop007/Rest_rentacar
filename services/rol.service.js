const { Rol } = require("../database/db");

class RolService {

    async getFindAll() {
        return await Rol.findAll();
    }

}

module.exports = RolService;