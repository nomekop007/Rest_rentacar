const { Region } = require("../config/database/db");

class RegionService {

    async getFindAll() {
        return await Region.findAll();
    }

}

module.exports = RegionService;