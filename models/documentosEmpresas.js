module.exports = (sequelize, type) => {
    return sequelize.define("documentosEmpresas", {
        id_documentoEmpresa: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documentoEstatuto: type.STRING,
        documentoRol: type.STRING,
        documentoVigencia: type.STRING,
        carnetFrontal: type.STRING,
        carnetTrasera: type.STRING,
        userAt: type.STRING,
    });
}