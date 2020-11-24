module.exports = (sequelize, type) => {
    return sequelize.define("facturaciones", {
        id_facturacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numero_facturacion: type.BIGINT(20),
        documento_facturacion: type.STRING,
        userAt: type.STRING,
    });
};