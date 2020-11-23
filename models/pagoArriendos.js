module.exports = (sequelize, type) => {
    return sequelize.define("pagosArriendos", {
        id_pagoArriendo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        remplazo_pagoArriendo: type.BIGINT(20),
        valorCopago_pagoArriendo: type.BIGINT(20),
        subtotal_pagoArriendo: type.BIGINT(20),
        descuento_pagoArriendo: type.BIGINT(20),
        neto_pagoArriendo: type.BIGINT(20),
        iva_pagoArriendo: type.BIGINT(20),
        total_pagoArriendo: type.BIGINT(20),
        observaciones_pagoArriendo: type.TEXT,
        userAt: type.STRING,
    });
};