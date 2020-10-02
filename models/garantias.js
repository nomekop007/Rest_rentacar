module.exports = (sequelize, type) => {
    return sequelize.define("garantias", {
        id_garantia: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numeroTarjeta_garantia: type.INTEGER,
        fechaTarjeta_garantia: type.STRING,
        codigoTargeta_garantia: type.STRING,
        numeroCheque_garantia: type.INTEGER,
        codigoCheque_garantia: type.STRING,
        monto_garantia: type.INTEGER
    });
};