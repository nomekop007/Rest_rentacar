module.exports = (sequelize, type) => {
    return sequelize.define("conductores", {
        id_conductor: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_conductor: type.STRING,
        rut_conductor: type.STRING,
        telefono_conductor: type.STRING,
        clase_conductor: type.STRING,
        numero_conductor: type.STRING,
        vcto_conductor: type.STRING,
        municipalidad_conductor: type.STRING,
        direccion_conductor: type.STRING,
    });
};