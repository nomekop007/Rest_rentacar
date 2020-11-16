module.exports = (sequelize, type) => {
    return sequelize.define("vehiculos", {
        patente_vehiculo: {
            type: type.STRING(11),
            primaryKey: true,
        },
        estado_vehiculo: type.STRING,
        chasis_vehiculo: type.STRING,
        transmision_vehiculo: type.STRING,
        numeroMotor_vehiculo: type.STRING,
        marca_vehiculo: type.STRING,
        modelo_vehiculo: type.STRING,
        tipo_vehiculo: type.STRING,
        color_vehiculo: type.STRING,
        compra_vehiculo: type.STRING,
        fechaCompra_vehiculo: type.DATE,
        año_vehiculo: type.INTEGER,
        foto_vehiculo: type.STRING,
        kilometraje_vehiculo: type.BIGINT(20),
        kilometrosMantencion_vehiculo: type.BIGINT(20),
        userAt: type.STRING,
    });
};