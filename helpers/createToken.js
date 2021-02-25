const jwt = require("jwt-simple");
const moment = require("moment");

module.exports = (usuario) => {
    const payload = {
        usuarioId: usuario.id_usuario,
        usuarioNombre: usuario.nombre_usuario,
        usuarioRol: usuario.id_rol,
        usuarioSucursal: usuario.id_sucursal,
        createAt: moment().unix(),
        expiredAt: moment().add(13, "hours").unix(),
    };
    return jwt.encode(payload, process.env.SECRET_PHRASE);
};