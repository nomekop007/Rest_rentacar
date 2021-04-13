const BaseRepository = require("../../base/dataAccess/base.repository");

class ClienteLicitacionRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "clienteLicitacion");
        this._db = db;
    }

}


module.exports = ClienteLicitacionRepository;