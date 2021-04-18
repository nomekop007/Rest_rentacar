module.exports = (sequelize, type) => {
    return sequelize.define("traslados", {
        id_traslado: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patente_vehiculo: type.STRING,
        id_sucursal: type.INTEGER,
        nombreSucursalOrigen: type.STRING,
        sucursalDestino: type.INTEGER,
        observacion: type.STRING,
        nombreSucursalDestino: type.STRING,
        conductor: type.STRING,
        rutConductor: type.STRING,
        estado: type.STRING,
        arrayimagenesOrigen: type.STRING(400),
        arrayimagenDestino: type.STRING(400),
        actaTrasladoOrigen: type.STRING,
        actaTrasladoDestino: type.STRING,
        fechaTrasladoOrigen: type.DATE,
        fechaTrasladoDestino: type.DATE,
        userAt: type.STRING,
        
    });
};