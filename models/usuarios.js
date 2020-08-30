module.exports = (sequelize, type) => {
  return sequelize.define("usuarios", {
    id_usuario: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: type.STRING,
    email_usuario: type.STRING,
    clave_usuario: type.STRING(150),
  });
};
