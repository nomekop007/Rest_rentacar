const { Extencion, PagoArriendo, Facturacion, ModoPago, Pago, Vehiculo, Contrato, Accesorio, PagoAccesorio } = require("../database/db");

class ExtencionService {

    async postCreate(DATA) {
        return await Extencion.create(DATA);
    }

    async findOne(ID) {
        return await Extencion.findOne({
            where: { id_extencion: ID },
            include: [{
                model: PagoArriendo,
                include: [
                    { model: PagoAccesorio, include: { model: Accesorio } },
                    { model: Pago, include: { model: Facturacion, include: { model: ModoPago } } }
                ]
            },
            { model: Vehiculo }, { model: Contrato }]
        })
    }

    async getFindAllWithArrindo(ID) {
        return await Extencion.findAll({
            where: { id_arriendo: ID }
        });
    }

    async putUpdateById(DATA, ID) {
        return await Extencion.update(DATA, {
            where: { id_extencion: ID },
        });
    }

}

module.exports = ExtencionService;