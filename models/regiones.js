module.exports = (sequelize, type) => {
    return sequelize.define("regiones", {
        id_region: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_region: type.STRING,
        userAt: type.STRING,
    });
};