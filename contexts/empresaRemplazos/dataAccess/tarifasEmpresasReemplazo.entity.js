module.exports = (sequelize, type) => {
    return sequelize.define("tarifasEmpresasReemplazos", {
        id_tarifaEmpresaRemplazo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_sucursal: type.INTEGER,
        codigo_empresaRemplazo: type.STRING(20),
        NombreEmpresaReemplazo: type.STRING,
        categoria: type.STRING,
        valor: type.INTEGER,
        userAt: type.STRING,
    });
};