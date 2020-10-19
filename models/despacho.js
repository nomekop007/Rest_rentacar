module.exports = (sequelize, type) => {
    return sequelize.define("despachos", {
        id_despacho: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreRecibidor_despacho: type.STRING,
        nombreDespachador_despacho: type.STRING,
        observaciones_despacho: type.STRING,
        userAt: type.STRING,
    });
};