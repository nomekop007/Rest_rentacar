module.exports = (sequelize, type) => {
    return sequelize.define("tarifasVehiculos", {
        id_tarifaVehiculo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valor_neto_diario: type.BIGINT(20),
        valor_neto_semanal: type.BIGINT(20),
        valor_neto_quincenal: type.BIGINT(20),
        valor_neto_mensual: type.BIGINT(20),
        userAt: type.STRING,
    })
}