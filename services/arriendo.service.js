const { Arriendo, DanioVehiculo, PagoAccesorio, DocumentoConductor, Accesorio, Usuario, Facturacion, Conductor, Sucursal, ModoPago, Contrato, PagoArriendo, Requisito, Garantia, EmpresaRemplazo, Despacho, Vehiculo, Cliente, Empresa, ActaEntrega, Remplazo, Contacto, Pago, DocumentoCliente, DocumentoEmpresa } = require("../database/db");
const { Op } = require("sequelize");

class ArriendoService {

    async postCreate(DATA) {
        return await Arriendo.create(DATA);
    }


    async putUpdate(DATA, ID) {
        return await Arriendo.update(DATA, {
            where: { id_arriendo: ID },
        });
    }


    async getFindAllActivos(id_sucursal, FILTER) {
        return await Arriendo.findAll({
            where: {
                [Op.or]: [
                    { estado_arriendo: FILTER[0] },
                    { estado_arriendo: FILTER[1] },
                ],
                id_sucursal: id_sucursal
            },
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Cliente },
                { model: Empresa },
                { model: Vehiculo },
                { model: PagoArriendo },
                { model: Requisito },
                { model: Garantia },
                { model: Remplazo, include: [{ model: EmpresaRemplazo }, { model: Cliente }] },
            ],
        });

    }

    async getFindAllPublic(WHERE) {
        return await Arriendo.findAll({
            where: WHERE,
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Cliente },
                { model: Empresa },
                { model: Vehiculo },
                { model: PagoArriendo },
                { model: Sucursal },
                { model: Requisito },
                { model: Garantia },
                { model: Remplazo, include: [{ model: EmpresaRemplazo }, { model: Cliente }] },
            ],
        });
    }


    async getFindOnePublic(ID) {
        return await Arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                {
                    model: Cliente, include: [{
                        model: DocumentoCliente,
                        attributes: ["carnetFrontal", "carnetTrasera"]
                    }]
                },
                {
                    model: Empresa, include: [{
                        model: DocumentoEmpresa,
                        attributes: ["documentoEstatuto", "documentoRol", "documentoVigencia", "carnetFrontal", "carnetTrasera"]
                    }]
                },
                {
                    model: Conductor, include: [{
                        model: DocumentoConductor,
                        attributes: ["licenciaConducirFrontal", "licenciaConducirTrasera"]
                    }]
                },
                { model: Remplazo, include: [{ model: Cliente, include: [{ model: DocumentoCliente, attributes: ["carnetFrontal", "carnetTrasera"] }] }, { model: EmpresaRemplazo }], },
                { model: Vehiculo },
                {
                    model: Requisito,
                    attributes: ["carnetFrontal_requisito", "carnetTrasera_requisito", "licenciaConducirFrontal_requisito",
                        "licenciaConducirTrasera_requisito", "tarjetaCredito_requisito", "chequeGarantia_requisito",
                        "comprobanteDomicilio_requisito", "cartaRemplazo_requisito", "boletaEfectivo_requisito",
                        "carpetaTributaria_requisito", "documentoEstatuto_requisito", "documentoRol_requisito",
                        "documentoVigencia_requisito", "cartaAutorizacion_requisito"]
                },
                { model: PagoArriendo, include: [{ model: Pago, include: [{ model: Facturacion }] }] },
                { model: Sucursal },
                { model: Contrato },
                { model: Contacto },
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Garantia, include: { model: ModoPago } },
                { model: Despacho, include: [{ model: ActaEntrega }] },
            ],
        });
    }

    async getFindOneClients(ID) {
        return await Arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: Cliente, include: [{ model: DocumentoCliente }] },
                { model: Empresa, include: [{ model: DocumentoEmpresa }] },
                { model: Conductor, include: [{ model: DocumentoConductor }] },
                { model: Remplazo, include: [{ model: Cliente, include: [{ model: DocumentoCliente }] }], },
            ],
        });
    }


    async getFindAll() {
        return await Arriendo.findAll({
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Sucursal },
                { model: Vehiculo },
                { model: Cliente },
                { model: Empresa },
                { model: Requisito },
                { model: Remplazo, include: [{ model: EmpresaRemplazo }, { model: Cliente }] },
                {
                    model: PagoArriendo,
                    include: [
                        { model: Contrato },
                        { model: PagoAccesorio, include: [{ model: Accesorio }] },
                        {
                            model: Pago,
                            include: [{
                                model: Facturacion,
                                include: [
                                    { model: ModoPago }
                                ],
                            }],
                        }
                    ],
                },
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
                { model: Contrato },
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
                        { model: Contrato },
                    ],
                },
            ],
        });
    }


    async getFindOneMin(ID) {
        return await Arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: Cliente },
                { model: Empresa },
                { model: Contrato },
                { model: Remplazo, include: [{ model: Cliente }] },
                { model: Usuario, attributes: ["nombre_usuario"] },
                {
                    model: PagoArriendo,
                    include: [{ model: Contrato }],
                },
            ],
        });
    }

}

module.exports = ArriendoService;