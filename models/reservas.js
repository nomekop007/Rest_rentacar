module.exports = (sequelize, type) => {
    return sequelize.define("reservas", {
        id_reserva: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo_reserva: type.STRING,
        descripcion_reserva: type.TEXT,
        inicio_reserva: type.DATE,
        fin_reserva: type.DATE,
        userAt: type.STRING,
    })
}