module.exports = (sequelize, type) => {
    return sequelize.define("cartaReemplazos", {
        id_cartaReemplazo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_extension: type.INTEGER,
        codigoCartaReemplazo: type.INTEGER,
        cartaReemplazo: type.STRING,
        userAt: type.STRING,
    });
};
