const { Propietario } = require("../database/db");

class PropietarioService {

    async getFindAll() {
        return await Propietario.findAll();
    }

}

module.exports = PropietarioService;