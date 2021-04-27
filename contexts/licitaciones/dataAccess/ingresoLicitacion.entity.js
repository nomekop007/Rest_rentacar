module.exports = (sequelize, type) => {
    return sequelize.define("ingresosLicitaciones", {
        id_ingresoLicitacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_ingresoLicitacion: type.DATE,
        monto_ingresoLicitacion: type.BIGINT(20),
        descripcion_ingresoLicitacion: type.STRING,
        userAt: type.STRING,
    });
};