const { Usuario, Rol, Sucursal } = require("../config/database/db");

class UsuarioService {


    async postCreate(DATA) {
        return await Usuario.create(DATA);
    }


    async getFindAll() {
        return await Usuario.findAll({
            include: [
                { model: Rol, attributes: ["nombre_rol"] },
                { model: Sucursal, attributes: ["nombre_sucursal"] },
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


    async getFindOne(ID) {
        return await Usuario.findOne({
            where: { id_usuario: ID },
            include: [
                { model: Rol, attributes: ["nombre_rol"] },
                { model: Sucursal, attributes: ["nombre_sucursal"] },
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


    async getFindByEmail(EMAIL) {
        return await Usuario.findOne({
            where: { email_usuario: EMAIL },
        });
    }


    async putUpdate(DATA, ID) {
        return await Usuario.update(DATA, {
            where: { id_usuario: ID },
        });
    }


}

module.exports = UsuarioService;