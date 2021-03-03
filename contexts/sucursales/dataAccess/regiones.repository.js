
class RegionRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.region.findAll();
    }

}

module.exports = RegionRepository;