module.exports = (sequelize, type) => {
    return sequelize.define("actasEntregas", {
        id_actaEntrega: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documento: type.STRING,
        userAt: type.STRING,
    });
};