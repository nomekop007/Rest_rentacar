module.exports = (sequelize, type) => {
    return sequelize.define("traslado", {
        id_traslado: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patente: type.STRING,
        sucursalOrigen: type.INTEGER,
        nombreSucursalOrigen: type.STRING,
        sucursalDestino: type.INTEGER,
        nombreSucursalDestino: type.STRING,
        conductor: type.STRING,
        rutConductor: type.STRING,
        estado: type.STRING,
        arrayimagenesOrigen: type.STRING,
        arrayimagenDestino: type.STRING,
        actaTrasladoOrigen: type.STRING,
        actaTraslaoDestino: type.STRING,
        fechaTrasladoOrigen: type.DATE,
        fechaTrasladoDestino: type.DATE,
        userAt: type.STRING,
        
    });
};