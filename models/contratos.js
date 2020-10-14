module.exports = (sequelize, type) => {
    return sequelize.define("contratos", {
        id_contrato: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documento: type.STRING,
        userAt: type.STRING,
    });
};