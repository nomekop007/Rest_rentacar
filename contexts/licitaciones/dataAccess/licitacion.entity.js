module.exports = (sequelize, type) => {
    return sequelize.define("licitaciones", {
        id_licitacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        codigo_licitacion: type.STRING,
        fechaInicio_licitacion: type.DATE,
        fechaTermino_licitacion: type.DATE,
        userAt: type.STRING,
    });
};