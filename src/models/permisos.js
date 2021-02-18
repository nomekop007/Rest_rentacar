module.exports = (sequelize, type) => {
    return sequelize.define("permisos", {
        id_permiso: {
            type: type.INTEGER,
            primaryKey: true,
        },
        nombre_permiso: type.STRING,
        descripcion_permiso: type.STRING,
        userAt: type.STRING,
    })
}