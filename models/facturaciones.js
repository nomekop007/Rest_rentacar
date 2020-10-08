module.exports = (sequelize, type) => {
    return sequelize.define("facturaciones", {
        id_facturacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo_facturacion: type.STRING,
        numero_facturacion: type.BIGINT(20),
    });
};