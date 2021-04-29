module.exports = (sequelize, type) => {
    return sequelize.define("tarifasEmpresasReemplazos", {
        id_tarifaEmpresaRemplazo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_sucursal: type.INTEGER,
        NombreSucursal: type.STRING,
        codigo_empresaRemplazo: type.STRING(20),
        categoria: type.STRING,
        valor: type.BIGINT(20),
        userAt: type.STRING,
    });
};
