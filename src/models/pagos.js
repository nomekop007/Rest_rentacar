module.exports = (sequelize, type) => {
    return sequelize.define("pagos", {
        id_pago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        neto_pago: type.BIGINT(20),
        iva_pago: type.BIGINT(20),
        total_pago: type.BIGINT(20),
        estado_pago: type.STRING,
        deuda_pago: type.BIGINT(20),
        deudor_pago: type.STRING,
        userAt: type.STRING,
    });
};