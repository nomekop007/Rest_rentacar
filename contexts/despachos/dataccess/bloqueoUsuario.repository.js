const BaseRepository = require("../../base/dataAccess/base.repository");

class BloqueoUsuarioRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "bloqueoUsuario")
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.bloqueoUsuario.create(DATA)
    }

    deleteDestroy(ID) {
        return this._db.bloqueoUsuario.destroy({
            where: { id_bloqueoUsuario: ID }
        })
    }

    getFindOneByUsuario(ID) {
        return this._db.bloqueoUsuario.findOne({
            where: { id_usuario: ID },
        })
    }
    getFindAllByUsuario(ID) {
        return this._db.bloqueoUsuario.findAll({
            where: { id_usuario: ID },
        })
    }

}

module.exports = BloqueoUsuarioRepository;