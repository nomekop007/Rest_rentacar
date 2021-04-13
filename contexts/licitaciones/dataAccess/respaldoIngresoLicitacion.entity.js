module.exports = (sequelize, type) => {
    return sequelize.define("respaldoIngresoLicitaciones", {
        id_respaldoIngresoLicitacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documento_respaldoIngresoLicitacion: type.STRING,
        userAt: type.STRING,
    });
};