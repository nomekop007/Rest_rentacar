module.exports = (sequelize, type) => {
    return sequelize.define("remplazos", {
        id_remplazo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreEmpresa_remplazo: type.STRING,
        userAt: type.STRING,
    });
};