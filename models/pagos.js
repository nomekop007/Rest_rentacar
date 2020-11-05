module.exports = (sequelize, type) => {
    return sequelize.define("pagos", {
        id_pago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        neto_pago: type.BIGINT(20),
        iva_pago: type.BIGINT(20),
        estado_pago: type.STRING,
        descuento_pago: type.BIGINT(20),
        total_pago: type.BIGINT(20),
        digitador_pago: type.STRING,
        observaciones_pago: type.TEXT,
        userAt: type.STRING,
    });
};