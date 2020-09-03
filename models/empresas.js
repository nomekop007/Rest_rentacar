module.exports = (sequelize, type) => {
    return sequelize.define("empresas", {
        id_empresa: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_empresa: type.STRING,
        rut_empresa: type.STRING,
        direccion_empresa: type.STRING,
        ciudad_empresa: type.STRING,
        telefono_empresa: type.STRING,
        correo_empresa: type.STRING,
    });
};