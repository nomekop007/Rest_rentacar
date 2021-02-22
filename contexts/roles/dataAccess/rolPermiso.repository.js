class RolPermisoRepository {

    constructor({ db }) {
        this._db = db;
    }

    async getFindAll() {
        return this._db.rolPermiso.findAll();
    }

    async getFindOneWithRol(ID) {
        return this._db.rolPermiso.findAll({
            where: { id_rol: ID },
            include: { model: this._db.permiso }
        })
    }

    async postCreate(DATA) {
        return this._db.rolPermiso.create(DATA);
    }

    async putUpdate(DATA, ID) {
        return this._db.rolPermiso.update(DATA, {
            where: { id_rolPermiso: ID }
        });
    }

    async getFindByPk(ID) {
        return this._db.rolPermiso.findByPk(ID);
    }

    async deleteById(ID) {
        return this._db.rolPermiso.destroy({
            where: { id_rolPermiso: ID }
        })
    }

}


module.exports = RolPermisoRepository;