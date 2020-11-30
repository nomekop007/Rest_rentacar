module.exports = (sequelize, type) => {
    return sequelize.define("danioVehiculo", {
        id_danioVehiculo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion_danioVehiculo: type.TEXT,
        documento_danioVehiculo: type.STRING,
        userAt: type.STRING,
    });
};