class ActaEntregaService {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.actaEntrega.create(DATA);
    }


    getFindOneByIDdespacho(ID_DESPACHO) {
        return this._db.actaEntrega.findOne({
            where: { id_despacho: ID_DESPACHO }
        });
    }


}


module.exports = ActaEntregaService;