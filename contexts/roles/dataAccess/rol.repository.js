
class RolRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.rol.findAll({
            include: { model: this._db.usuario }
        });
    }


    postCreate(DATA) {
        return this._db.rol.create(DATA);
    }


    putUpdate(DATA, ID) {
        return this._db.rol.update(DATA, {
            where: { id_rol: ID }
        })
    }


    getFindByPk(ID) {
        return this._db.rol.findByPk(ID);
    }

}

module.exports = RolRepository;