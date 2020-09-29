module.exports = (sequelize, type) => {
    return sequelize.define("pagos", {
        id_pago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        abonoGarantia_pago: type.INTEGER,
        neto_pago: type.INTEGER,
        iva_pago: type.INTEGER,
        descuento_pago: type.INTEGER,
        total_pago: type.INTEGER,
        tipoPago_pago: type.STRING,
        tipoFacturacion_pago: type.STRING,
        digitador_pago: type.STRING,
        observaciones_pago: type.TEXT,
    });
};