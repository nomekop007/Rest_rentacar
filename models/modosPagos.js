module.exports = (sequelize, type) => {
    return sequelize.define("modosPagos", {
        id_modoPago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_modoPago: type.STRING,
        userAt: type.STRING,
    });
};