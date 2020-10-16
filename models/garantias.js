module.exports = (sequelize, type) => {
    return sequelize.define("garantias", {
        id_garantia: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numeroTarjeta_garantia: type.STRING,
        fechaTarjeta_garantia: type.STRING,
        codigoTarjeta_garantia: type.STRING,
        numeroCheque_garantia: type.STRING,
        codigoCheque_garantia: type.STRING,
        monto_garantia: type.BIGINT(20),
        userAt: type.STRING,
    });
};