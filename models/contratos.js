module.exports = (sequelize, type) => {
    return sequelize.define("contratos", {
        id_contrato: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url_contrato: type.STRING,
    });
};