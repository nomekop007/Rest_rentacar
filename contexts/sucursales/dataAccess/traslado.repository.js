const BaseRepository = require("../../base/dataAccess/base.repository");

class TrasladoRepository extends BaseRepository {


    constructor({db}){
        super(db,"traslado")
        this._db = db;
    }

    postCreate(DATA){
        return this._db.traslado.create(DATA);
    }
    
    getFindAll() {
        return this._db.traslado.findAll();
    }

    getFindOne(ID) {
        return this._db.traslado.findOne({
            where: { id_traslado: ID },
        })
    }


    putUpdateEstado(ID, DATA) {

        return this._db.traslado.update(DATA, { where: { id_traslado: ID } });
    }
    
    postDelete(ID)
    {
        return this._db.traslado.destroy({
            where: {id_traslado:ID}
        })
    }

}

module.exports = TrasladoRepository;