const { PagoAccesorio } = require("../config/database/db");

class PagoAccesorioService {

    async postCreate(DATA) {
        return await PagoAccesorio.create(DATA);
    }

}

module.exports = PagoAccesorioService;