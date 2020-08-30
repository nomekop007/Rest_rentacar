module.exports = (sequelize, type) => {
  return sequelize.define("sucursales", {
    id_sucursal: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_sucursal: type.STRING,
  });
};
