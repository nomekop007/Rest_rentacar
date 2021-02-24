class ContratoRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.contrato.create(DATA);
    }

    deleteByIDArriendo(ID) {
        return this._db.contrato.destroy({
            where: { id_arriendo: ID }
        });
    }


}

module.exports = ContratoRepository;