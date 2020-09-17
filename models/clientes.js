module.exports = (sequelize, type) => {
    return sequelize.define("clientes", {
        rut_cliente: {
            type: type.STRING(20),
            primaryKey: true,
        },
        nombre_cliente: type.STRING,
        direccion_cliente: type.STRING,
        estadoCivil_cliente: type.STRING,
        ciudad_cliente: type.STRING,
        telefono_cliente: type.STRING,
        correo_cliente: type.STRING,
        fechaNacimiento_cliente: type.DATE,
    });
};