module.exports = (sequelize, type) => {
    return sequelize.define("pagos", {
        id_pago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        copago_pago: type.BIGINT(20),
        subtotal_pago: type.BIGINT(20),

        descuento_pago: type.BIGINT(20),
        neto_pago: type.BIGINT(20),
        iva_pago: type.BIGINT(20),
        total_pago: type.BIGINT(20),

        estado_pago: type.STRING,
        digitador_pago: type.STRING,
        observaciones_pago: type.TEXT,
        userAt: type.STRING,
    });
};