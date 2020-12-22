module.exports = (sequelize, type) => {
    return sequelize.define("documentosConductores", {
        id_documentoConductor: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        licenciaConducirFrontal: type.STRING,
        licenciaConducirTrasera: type.STRING,
        userAt: type.STRING,
    })
}