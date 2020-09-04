module.exports = (sequelize, type) => {
    return sequelize.define("arriendos", {
        id_arriendo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado_arriendo: type.STRING,
        kilometrosEntrada_arriendo: type.INTEGER,
        kilometrosSalida_arriendo: type.INTEGER,
        ciudadEntrega_arriendo: type.STRING,
        fechaEntrega_arriendo: type.DATE,
        ciudadRecepcion_arriendo: type.STRING,
        fechaRecepcion_arriendo: type.DATE,
        numeros_arriendo: type.INTEGER,
        tipo_arriendo: type.STRING,
        observaciones_arriendo: type.TEXT,
    });
};