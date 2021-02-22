module.exports = (sequelize, type) => {
    return sequelize.define("reservasClientes", {
        id_reservaCliente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userAt: type.STRING,
    })
}