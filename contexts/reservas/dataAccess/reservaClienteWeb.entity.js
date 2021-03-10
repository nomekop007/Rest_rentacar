module.exports = (sequelize, type) => {
    return sequelize.define("reservasClientesWeb", {
        id_reservaClienteWeb: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_reservaClienteWeb: type.STRING,
        telefono_reservaClienteWeb: type.STRING,
        correo_reservaClienteWeb: type.STRING,
    });
}