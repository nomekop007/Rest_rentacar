module.exports = (sequelize, type) => {
    return sequelize.define("pagos-accesorios", {
        id_pagoAccesorios: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        precioVenta_accesorio: type.BIGINT(20),
        userAt: type.STRING,
    });
};