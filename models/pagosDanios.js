module.exports = (sequelize, type) => {
    return sequelize.define("pagosDanios", {
        id_pagoDanio: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        precioTotal_pagoDanio: type.BIGINT(20),
        comprobante_pagoDanio: type.STRING,
        userAt: type.STRING,
    });
};