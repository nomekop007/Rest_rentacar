module.exports = (sequelize, type) => {
    return sequelize.define("empresasRemplazos", {
        codigo_empresaRemplazo: {
            type: type.STRING(20),
            primaryKey: true,
        },
        nombre_empresaRemplazo: type.STRING,
        userAt: type.STRING,
    });
};