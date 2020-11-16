module.exports = (sequelize, type) => {
    return sequelize.define("remplazos", {
        id_remplazo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userAt: type.STRING,
    });
};