const { Arriendo, DanioVehiculo, PagoAccesorio, Accesorio, Usuario, Facturacion, Conductor, Sucursal, ModoPago, Contrato, PagoArriendo, Requisito, Garantia, EmpresaRemplazo, Despacho, Vehiculo, Cliente, Empresa, ActaEntrega, Remplazo, Contacto, Pago } = require("../database/db");

class ArriendoService {

    async postCreate(DATA) {
        return await Arriendo.create(DATA);
    }


    async putUpdateState(DATA, ID) {
        return await Arriendo.update(DATA, {
            where: { id_arriendo: ID },
        });
    }


    async getFindAllPublic(WHERE) {
        return await Arriendo.findAll({
            where: WHERE,
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Cliente, attributes: ["nombre_cliente", "rut_cliente"] },
                { model: Empresa, attributes: ["nombre_empresa", "rut_empresa"] },
                { model: Vehiculo, attributes: ["patente_vehiculo"] },
                { model: PagoArriendo },
                { model: Requisito },
                { model: Garantia },
                { model: Remplazo, include: [{ model: EmpresaRemplazo }, { model: Cliente, attributes: ["nombre_cliente", "rut_cliente"] }] },
            ],
        });
    }


    async getFindOnePublic(ID) {
        return await Arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: Cliente },
                { model: Empresa },
                { model: Vehiculo },
                { model: Conductor },
                { model: Requisito },
                { model: PagoArriendo },
                { model: Sucursal },
                { model: Contrato },
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Garantia, include: { model: ModoPago } },
                { model: Remplazo, include: [{ model: Cliente }, { model: EmpresaRemplazo }], },
                { model: Despacho, include: [{ model: ActaEntrega }] },

            ],
        });
    }


    async getFindOne(ID) {
        return await Arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: Vehiculo },
                { model: Cliente },
                { model: Conductor },
                { model: Contacto },
                { model: Empresa },
                { model: Sucursal },
                { model: DanioVehiculo },
                { model: Requisito },
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Despacho, include: [{ model: ActaEntrega }] },
                { model: Remplazo, include: [{ model: Cliente }] },
                { model: Garantia, include: [{ model: ModoPago }] },
                {
                    model: PagoArriendo,
                    include: [
                        { model: Pago, include: { model: Facturacion, include: { model: ModoPago } } },
                        { model: PagoAccesorio, include: [{ model: Accesorio }] },
                    ],
                },
            ],
        });
    }

}

module.exports = ArriendoService;