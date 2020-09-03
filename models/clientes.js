module.exports = (sequelize, type) => {
    return sequelize.define("clientes", {
        id_cliente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_cliente: type.STRING,
        direccion_cliente: type.STRING,
        ciudad_cliente: type.STRING,
        rut_cliente: type.STRING,
        telefono_cliente: type.STRING,
        fechaNacimiento_cliente: type.DATE,
    });
};