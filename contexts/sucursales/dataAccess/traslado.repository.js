const BaseRepository = require("../../base/dataAccess/base.repository");

class TrasladoRepository extends BaseRepository {


    constructor({db}){
        super(db,"traslado")
        this._db = db;
    }

    postCreate(DATA){
        return this._db.traslado.create(DATA);
    }

}