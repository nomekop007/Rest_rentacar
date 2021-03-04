class RecepcionUsuarioRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.recepcionUsuario.create(DATA)
    }

    getFindOneByUsuario(ID) {
        return this._db.recepcionUsuario.findOne({
            where: { id_usuario: ID },
            include: [{ model: this._db.arriendo }]
        })
    }

}

module.exports = RecepcionUsuarioRepository;