class FotoDespachoRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAllByArriendo(ID) {
        return this._db.fotoDespacho.findAll({
            where: { id_arriendo: ID }
        });
    }


    postCreate(DATA) {
        return this._db.fotoDespacho.create(DATA);
    }


    putUpdate(DATA, ID) {
        return this._db.fotoDespacho.update(DATA, {
            where: { id_fotoDespacho: ID },
        });
    }


    getFindByPk(ID) {
        return this._db.fotoDespacho.findByPk(ID);
    }

    deleteByIdArriendo(ID) {
        return this._db.fotoDespacho.destroy({
            where: { id_arriendo: ID }
        })
    }

}


module.exports = FotoDespachoRepository;