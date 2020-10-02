module.exports = (sequelize, type) => {
    return sequelize.define("pagos", {
        id_pago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        neto_pago: type.INTEGER,
        iva_pago: type.INTEGER,
        descuento_pago: type.INTEGER,
        total_pago: type.INTEGER,
        digitador_pago: type.STRING,
        observaciones_pago: type.TEXT,
    });
};