module.exports = (sequelize, type) => {
    return sequelize.define("empresas", {
        rut_empresa: {
            type: type.STRING(11),
            primaryKey: true,
        },
        nombre_empresa: type.STRING,
        rol_empresa: type.STRING,
        vigencia_empresa: type.STRING,
        direccion_empresa: type.STRING,
        ciudad_empresa: type.STRING,
        telefono_empresa: type.STRING,
        correo_empresa: type.STRING,
    });
};