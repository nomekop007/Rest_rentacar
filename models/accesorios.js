module.exports = (sequelize, type) => {
    return sequelize.define("accesorios", {
        id_accesorio: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_accesorio: type.STRING,
        precio_accesorio: type.BIGINT(20),
        userAt: type.STRING,
    });
};