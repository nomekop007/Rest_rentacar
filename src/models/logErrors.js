module.exports = (sequelize, type) => {
    return sequelize.define("logErrors", {
        id_logError: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userAt_logError: type.STRING,
        body_logError: type.STRING(5000),
        msg_logError: type.STRING(5000),
        accion_logError: type.STRING,
    });
};