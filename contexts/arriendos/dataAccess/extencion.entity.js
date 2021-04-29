module.exports = (sequelize, type) => {
    return sequelize.define("extenciones", {
        id_extencion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado_extencion: type.STRING,
        fechaInicio_extencion: type.DATE,
        fechaFin_extencion: type.DATE,
        dias_extencion: type.BIGINT(20),
        userAt: type.STRING,
    });
};
