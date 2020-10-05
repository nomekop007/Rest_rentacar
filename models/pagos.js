module.exports = (sequelize, type) => {
    return sequelize.define("pagos", {
        id_pago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        neto_pago: type.BIGINT(20),
        iva_pago: type.BIGINT(20),
        descuento_pago: type.BIGINT(20),
        total_pago: type.BIGINT(20),
        digitador_pago: type.STRING,
        observaciones_pago: type.TEXT,
    });
};