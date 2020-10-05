module.exports = (sequelize, type) => {
    return sequelize.define("garantias", {
        id_garantia: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numeroTarjeta_garantia: type.BIGINT(20),
        fechaTarjeta_garantia: type.STRING,
        codigoTargeta_garantia: type.STRING,
        numeroCheque_garantia: type.BIGINT(20),
        codigoCheque_garantia: type.STRING,
        monto_garantia: type.BIGINT(20)
    });
};