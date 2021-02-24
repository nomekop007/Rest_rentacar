class PermisoRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.permiso.findAll();
    }


    postCreate(DATA) {
        return this._db.permiso.create(DATA);
    }

    putUpdate(DATA, ID) {
        return this._db.permiso.update(DATA, {
            where: { id_permiso: ID }
        })
    }

    getFindByPk(ID) {
        return this._db.permiso.findByPk(ID);
    }


}

module.exports = PermisoRepository;