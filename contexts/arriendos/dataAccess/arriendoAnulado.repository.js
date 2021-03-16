
class ArriendoAnuladoRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.arriendoAnulado.create(DATA);
    }

}

module.exports = ArriendoAnuladoRepository;