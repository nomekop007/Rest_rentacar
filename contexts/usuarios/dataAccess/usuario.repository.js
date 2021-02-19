class UsuarioRepository {

    constructor({ db }) {
        this._db = db;
    }


    postCreate(DATA) {
        return this._db.usuario.create(DATA);
    }


    getFindAll() {
        return this._db.usuario.findAll({
            include: [
                { model: this._db.rol, attributes: ["nombre_rol"] },
                { model: this._db.sucursal, attributes: ["nombre_sucursal"] },
            ],
            attributes: [
                "estado_usuario",
                "id_usuario",
                "nombre_usuario",
                "email_usuario",
                "createdAt",
            ],
        });
    }


    getFindOne(ID) {
        return this._db.usuario.findOne({
            where: { id_usuario: ID },
            include: [
                { model: this._db.rol, attributes: ["nombre_rol"] },
                { model: this._db.sucursal, attributes: ["nombre_sucursal"] },
            ],
            attributes: [
                "estado_usuario",
                "id_usuario",
                "id_sucursal",
                "id_rol",
                "nombre_usuario",
                "email_usuario",
                "createdAt",
            ],
        });
    }


    getFindByEmail(EMAIL) {
        return this._db.usuario.findOne({
            where: { email_usuario: EMAIL },
        });
    }


    putUpdate(DATA, ID) {
        return this._db.usuario.update(DATA, {
            where: { id_usuario: ID },
        });
    }


}


module.exports = UsuarioRepository;