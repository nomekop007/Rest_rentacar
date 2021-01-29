module.exports = (sequelize, type) => {
    return sequelize.define("reservasEmpresas", {
        id_reservaEmpresa: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userAt: type.STRING,
    })
}