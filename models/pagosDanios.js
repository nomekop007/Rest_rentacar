module.exports = (sequelize, type) => {
    return sequelize.define("pagosDanios", {
        id_pagoDanio: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mecanico_pagoDanio: type.STRING,
        pagador_pagoDanio: type.STRING,
        precioTotal_pagoDanio: type.BIGINT(20),
        userAt: type.STRING,
    });
};