module.exports = (sequelize, type) => {
    return sequelize.define("contactos", {
        id_contacto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_contacto: type.STRING,
        domicilio_contacto: type.STRING,
        numeroCasa_contacto: type.STRING,
        ciudad_contacto: type.STRING,
        telefono_contacto: type.STRING,
        userAt: type.STRING,
    });
};