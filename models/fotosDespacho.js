module.exports = (sequelize, type) => {
    return sequelize.define("fotosDespachos", {
        id_fotosDespacho: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documento: type.STRING,
        userAt: type.STRING,
    });
};