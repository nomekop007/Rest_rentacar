const { Abono, Facturacion } = require("../config/database/db");

class AbonoService {


    async postCreateWithFacturacion(DATA) {
        return await Abono.create(DATA, {
            include: [Facturacion]
        });
    }


}


module.exports = AbonoService;