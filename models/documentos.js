module.exports = (sequelize, type) => {
    return sequelize.define("documentos", {
        id_documento: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo_documento: type.STRING,
        url_documento: type.STRING,
    });
};