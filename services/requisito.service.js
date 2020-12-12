const { Requisito } = require("../database/db");

class RequisitoService {

    async postCreate(DATA) {
        return await Requisito.create(DATA);
    }


}

module.exports = RequisitoService;