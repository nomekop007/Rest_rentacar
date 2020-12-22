module.exports = (sequelize, type) => {
    return sequelize.define("documentosClientes", {
        id_documentoCliente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        carnetFrontal: type.STRING,
        carnetTrasera: type.STRING,
        userAt: type.STRING,
    })
}