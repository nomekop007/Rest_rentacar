module.exports = (sequelize, type) => {
    return sequelize.define("conductores", {
        rut_conductor: {
            type: type.STRING(11),
            primaryKey: true,
        },
        nombre_conductor: type.STRING,
        telefono_conductor: type.STRING,
        clase_conductor: type.STRING,
        numero_conductor: type.STRING,
        vcto_conductor: type.DATE,
        municipalidad_conductor: type.STRING,
        direccion_conductor: type.STRING,
    });
};