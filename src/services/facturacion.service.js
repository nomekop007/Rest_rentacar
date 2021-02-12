const { Facturacion, Pago } = require("../config/database/db");

class FacuracionService {

    async getFindAll() {
        return await Facturacion.findAll({
            include: Pago,
        });
    }


    async postCreate(DATA) {
        return await Facturacion.create(DATA);
    }


    async putUpdate(DATA, ID) {
        return await Facturacion.update(DATA, {
            where: { id_facturacion: ID },
        });
    }

}

module.exports = FacuracionService;