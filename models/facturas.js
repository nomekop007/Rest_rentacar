module.exports = (sequelize, type) => {
    return sequelize.define("facturas", {
        id_factura: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numero_factura: type.STRING
    });
};