module.exports = (sequelize, type) => {
    return sequelize.define("fotosDespachos", {
        id_fotosDespacho: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        frontal_fotosDespacho: type.STRING,
        trasera_fotosDespacho: type.STRING,
        derecha_fotosDespacho: type.STRING,
        izquierda_fotosDespacho: type.STRING,
        userAt: type.STRING,
    });
};