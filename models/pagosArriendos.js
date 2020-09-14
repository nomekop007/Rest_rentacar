module.exports = (sequelize, type) => {
    return sequelize.define("pagosArriendos", {
        id_pagoArriendo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado_pagoArriendo: type.STRING,
        abonoGarantia_pagoArriendo: type.INTEGER,
        neto_pagoArriendo: type.INTEGER,
        iva_pagoArriendo: type.INTEGER,
        descuento_pagoArriendo: type.INTEGER,
        total_pagoArriendo: type.INTEGER,
        tipoPago_pagoArriendo: type.STRING,
        tipoFacturacion_pagoArriendo: type.STRING,
        digitador_pagoArriendo: type.STRING,
        observaciones_pagoArriendo: type.TEXT
    });
};