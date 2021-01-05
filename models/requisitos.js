module.exports = (sequelize, type) => {
    return sequelize.define("requisitos", {
        id_requisito: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        carnetFrontal_requisito: type.STRING,
        carnetTrasera_requisito: type.STRING,
        licenciaConducirFrontal_requisito: type.STRING,
        licenciaConducirTrasera_requisito: type.STRING,
        tarjetaCredito_requisito: type.STRING,
        chequeGarantia_requisito: type.STRING,
        comprobanteDomicilio_requisito: type.STRING,
        cartaRemplazo_requisito: type.STRING,
        boletaEfectivo_requisito: type.STRING,
        documentoEstatuto_requisito: type.STRING,
        documentoRol_requisito: type.STRING,
        documentoVigencia_requisito: type.STRING,
        carpetaTributaria_requisito: type.STRING,
        cartaAutorizacion_requisito: type.STRING,
        userAt: type.STRING,
    });
};