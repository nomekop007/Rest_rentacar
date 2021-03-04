module.exports = (sequelize, type) => {
    return sequelize.define("recepcionUsuarios", {
        id_recepcionUsuarios: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userAt: type.STRING,
    });
};