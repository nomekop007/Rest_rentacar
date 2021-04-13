module.exports = (sequelize, type) => {
    return sequelize.define("clientesLicitaciones", {
        id_clienteLicitacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_clienteLicitacion: type.STRING,
        rut_clienteLicitacion: type.STRING,
        direccion_clienteLicitacion: type.STRING,
        giro_clienteLicitacion: type.STRING,
        userAt: type.STRING,
    });
};