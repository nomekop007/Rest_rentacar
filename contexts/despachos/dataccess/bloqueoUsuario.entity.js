module.exports = (sequelize, type) => {
    return sequelize.define("bloqueoUsuarios", {
        id_bloqueoUsuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo_bloqueoUsuario: type.STRING,
        userAt: type.STRING,
    });
};