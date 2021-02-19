module.exports = (sequelize, type) => {
    return sequelize.define("pagosHistoriales", {
        id_pagoHistorial: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pagoAnterior_pagoHistorial: type.BIGINT(20),
        pagoPosterior_pagoHistorial: type.BIGINT(20),
        monto_pagoHistorial: type.BIGINT(20),
        detalle_pagoHistorial: type.STRING,
        tipo_pagoHistorial: type.STRING,
        userAt: type.STRING,
    });
};