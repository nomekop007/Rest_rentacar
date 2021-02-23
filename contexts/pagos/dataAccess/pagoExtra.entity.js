module.exports = (sequelize, type) => {
    return sequelize.define("pagosExtras", {
        id_pagoExtra: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        monto_pagoExtra: type.BIGINT(20),
        detalle_pagoExtra: type.STRING,
        userAt: type.STRING,
    });
};