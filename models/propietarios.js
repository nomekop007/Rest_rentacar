module.exports = (sequelize, type) => {
    return sequelize.define("propietarios", {
        rut_propietario: {
            type: type.STRING(20),
            primaryKey: true,
        },
        nombre_propietario: type.STRING,
    });
};