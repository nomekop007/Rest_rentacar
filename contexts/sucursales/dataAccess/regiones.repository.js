const BaseRepository = require("../../base/dataAccess/base.repository");

class RegionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "region")
        this._db = db;
    }

    getFindAll() {
        return this._db.region.findAll();
    }

}

module.exports = RegionRepository;