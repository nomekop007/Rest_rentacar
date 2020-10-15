module.exports = (sequelize, type) => {
    return sequelize.define("requisitos", {
        id_requisito: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        carnetFrontal_requisito: type.STRING,
        carnetTrasera_requisito: type.STRING,
        tarjetaCreditoFrontal_requisito: type.STRING,
        tarjetaCreditoTrasera_requisito: type.STRING,
        licenciaConducir_requisito: type.STRING,
        chequeGarantia_requisito: type.STRING,
        comprobanteDomicilio_requisito: type.STRING,
        cartaRemplazo_requisito: type.STRING,
        userAt: type.STRING,
    });
};