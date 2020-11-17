module.exports = (sequelize, type) => {
    return sequelize.define("arriendos", {
        id_arriendo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado_arriendo: type.STRING,
        kilometrosEntrada_arriendo: type.BIGINT(20),
        kilometrosSalida_arriendo: type.BIGINT(20),
        ciudadEntrega_arriendo: type.STRING,
        fechaEntrega_arriendo: type.DATE,
        ciudadRecepcion_arriendo: type.STRING,
        fechaRecepcion_arriendo: type.DATE,
        diasActuales_arriendo: type.BIGINT(20),
        diasAcumulados_arriendo: type.BIGINT(20),
        tipo_arriendo: type.STRING,
        userAt: type.STRING,
    });
};