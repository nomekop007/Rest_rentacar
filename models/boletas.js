module.exports = (sequelize, type) => {
    return sequelize.define("boletas", {
        id_boleta: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numero_boleta: type.BIGINT(20),
    });
};