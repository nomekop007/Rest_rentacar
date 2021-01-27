const { PagoDanio } = require("../database/db");

class PagoDanioService {

    async postCreate(DATA) {
        return await PagoDanio.create(DATA);
    }

}

module.exports = PagoDanioService;