module.exports = (sequelize, type) => {
    return sequelize.define("usuarios", {
        id_usuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado_usuario: type.BOOLEAN,
        nombre_usuario: type.STRING,
        email_usuario: type.STRING,
        clave_usuario: type.STRING(150),
        userAt: type.STRING,
    });
};