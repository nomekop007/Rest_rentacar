class RecepcionUsuarioRepository {

    constructor({ db }) {
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.recepcionUsuario.create(DATA)
    }

    deleteDestroy(ID) {
        return this._db.recepcionUsuario.destroy({
            where: { id_recepcionUsuarios: ID }
        })
    }

    getFindOneByUsuario(ID) {
        return this._db.recepcionUsuario.findOne({
            where: { id_usuario: ID },
        })
    }

}

module.exports = RecepcionUsuarioRepository;