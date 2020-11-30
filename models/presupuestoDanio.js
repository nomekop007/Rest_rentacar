module.exports = (sequelize, type) => {
    return sequelize.define("presupuestoDanio", {
        id_presupuestoDanio: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        precio_presupuestoDanio: type.BIGINT(20),
        comprobante_presupuestoDanio: type.STRING,
        userAt: type.STRING,
    });
};