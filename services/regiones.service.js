const { Region } = require("../database/db");

class RegionService {

    async getFindAll() {
        return await Region.findAll();
    }

}

module.exports = RegionService;