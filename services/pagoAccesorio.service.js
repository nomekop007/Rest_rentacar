const { PagoAccesorio } = require("../database/db");

class PagoAccesorioService {

    async postCreate(DATA) {
        return await PagoAccesorio.create(DATA);
    }

}

module.exports = PagoAccesorioService;