module.exports = (sequelize, type) => {
    return sequelize.define("logs", {
        id_log: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userAt_log: type.STRING,
        body_log: type.STRING(5000),
        accion_log: type.STRING,
    });
};