class PermisoRepository {

    constructor({ db }) {
        this.db = db;
    }

    getFindAll() {
        return this.db.permiso.findAll();
    }


    postCreate(DATA) {
        return this.db.permiso.create(DATA);
    }

    putUpdate(DATA, ID) {
        return this.db.permiso.update(DATA, {
            where: { id_permiso: ID }
        })
    }

    getFindByPk(ID) {
        return this.db.permiso.findByPk(ID);
    }


}

module.exports = PermisoRepository;