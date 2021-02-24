module.exports = (sequelize, type) => {
    return sequelize.define("abonos", {
        id_abono: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pago_abono: type.BIGINT(20),
        userAt: type.STRING,
    });
};