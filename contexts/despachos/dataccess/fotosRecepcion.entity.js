module.exports = (sequelize, type) => {
    return sequelize.define("fotosRecepciones", {
        id_fotoRecepcion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url_fotoRecepcion: type.STRING,
        userAt: type.STRING,
    });
};