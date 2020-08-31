module.exports = (sequelize, type) => {
  return sequelize.define("vehiculos", {
    patente_vehiculo: {
      type: type.STRING(11),
      primaryKey: true,
    },
    modelo_vehiculo: type.STRING,
    tipo_vehiculo: type.STRING,
    color_vehiculo: type.STRING,
    precio_vehiculo: type.INTEGER,
    propietario_vehiculo: type.STRING,
    fechaCompra_vehiculo: type.DATE,
    año_vehiculo: type.INTEGER,
    foto_vehiculo: type.STRING,
  });
};
