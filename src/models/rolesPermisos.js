module.exports = (sequelize, type) => {
    return sequelize.define("rolesPermisos", {
        id_rolPermiso: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userAt: type.STRING,
    });
};