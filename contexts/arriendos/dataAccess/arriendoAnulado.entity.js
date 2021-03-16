module.exports = (sequelize, type) => {
    return sequelize.define("arriendosAnulados", {
        id_arriendoAnulado: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        motivo_arriendoAnulado: type.STRING,
        contrato_arriendoAnulado: type.STRING,
        acta_arriendoAnulado: type.STRING,
        numero_arriendoAnulado: type.INTEGER,
        userAt: type.STRING,
    });
};