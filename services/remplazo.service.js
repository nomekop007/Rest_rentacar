const { Remplazo } = require("../database/db");

class RemplazoService {

    async postCreate(DATA) {
        return await Remplazo.create(DATA);
    }

}

module.exports = RemplazoService;