const { Arriendo, Usuario, Conductor, Sucursal, ModoPago, Contrato, PagoArriendo, Requisito, Garantia, EmpresaRemplazo, Despacho, Vehiculo, Cliente, Empresa, ActaEntrega, Remplazo } = require("../database/db");

class ArriendoServices {


    async getFindAllPublic(WHERE) {
        const arriendos = await Arriendo.findAll({
            where: WHERE,
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Cliente, attributes: ["nombre_cliente", "rut_cliente"] },
                { model: Empresa, attributes: ["nombre_empresa", "rut_empresa"] },
                { model: Vehiculo, attributes: ["patente_vehiculo"] },
                { model: PagoArriendo },
                { model: Requisito },
                { model: Garantia },
                {
                    model: Remplazo,
                    include: [{ model: EmpresaRemplazo }, { model: Cliente, attributes: ["nombre_cliente", "rut_cliente"] }],
                },
            ],
        });
        return arriendos;
    }


    async getFindOnePublic(ID) {
        const arriendo = await Arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: Cliente },
                { model: Empresa },
                { model: Vehiculo },
                { model: Conductor },
                { model: Requisito },
                { model: Garantia, include: { model: ModoPago } },
                { model: PagoArriendo },
                { model: Sucursal },
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Remplazo, include: [{ model: Cliente }, { model: EmpresaRemplazo }], },
                { model: Despacho, include: [{ model: ActaEntrega }] },
                { model: Contrato }
            ],
        });
        return arriendo;
    }


    async getFindOne(ID) {
        const arriendo = await Arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: Despacho, include: [{ model: ActaEntrega }] },
                { model: Vehiculo },
                { model: Cliente },
                { model: Empresa },
                {
                    model: Remplazo,
                    include: [{
                        model: Cliente,
                    },],
                },

            ],
        });
        return arriendo;
    }

}

module.exports = ArriendoServices;