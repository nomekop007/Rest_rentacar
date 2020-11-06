module.exports = (sequelize, type) => {
    return sequelize.define("pagosAccesorios", {
        id_pagoAccesorio: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_pagoAccesorio: type.STRING,
        precioVenta_pagoAccesorio: type.BIGINT(20),
        userAt: type.STRING,
    });
};