module.exports = (sequelize, type) => {
    return sequelize.define("contratos", {
        id_contrato: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_documento: type.STRING,
        id_signature: type.STRING,
    });
};