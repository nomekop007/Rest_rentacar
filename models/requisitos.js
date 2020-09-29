module.exports = (sequelize, type) => {
    return sequelize.define("requisitos", {
        id_requisito: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        carnetFrontal_requisito: type.STRING,
        carnetTrasera_requisito: type.STRING,
        licenciaFrontal_requisito: type.STRING,
        licenciaTrasera_requisito: type.STRING,
        targetaCredito_requisito: type.STRING,
        chequeGarantia_requisito: type.STRING,
        comprobanteDomicilio_requisito: type.STRING,
    });
};