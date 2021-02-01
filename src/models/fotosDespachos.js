module.exports = (sequelize, type) => {
    return sequelize.define("fotosDespachos", {
        id_fotoDespacho: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url_fotoDespacho: type.STRING,
        userAt: type.STRING,
    });
};