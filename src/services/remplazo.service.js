const { Remplazo } = require("../config/database/db");

class RemplazoService {

    async postCreate(DATA) {
        return await Remplazo.create(DATA);
    }

    async putUpdate(DATA, ID) {
        return await Remplazo.update(DATA, {
            where: { id_remplazo: ID },
        });
    }

}

module.exports = RemplazoService;