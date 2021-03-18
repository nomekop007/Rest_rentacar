const { Op } = require("sequelize");
const BaseRepository = require("../../base/dataAccess/base.repository");

class ArriendoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "arriendo");
        this._db = db;
    }
    postCreate(DATA) {
        return this._db.arriendo.create(DATA);
    }


    putUpdate(DATA, ID) {
        return this._db.arriendo.update(DATA, {
            where: { id_arriendo: ID },
        });
    }


    getFindAllActivos(id_sucursal, FILTER) {
        return this._db.arriendo.findAll({
            where: {
                [Op.or]: [
                    { estado_arriendo: FILTER[0] ? FILTER[0] : null },
                    { estado_arriendo: FILTER[1] ? FILTER[1] : null },
                ],
                id_sucursal: id_sucursal
            },
            include: [
                { model: this._db.usuario, attributes: ["nombre_usuario"] },
                { model: this._db.cliente },
                { model: this._db.empresa },
                { model: this._db.sucursal },
                { model: this._db.vehiculo },
                { model: this._db.pagoArriendo },
                { model: this._db.requisito },
                { model: this._db.garantia },
                { model: this._db.remplazo, include: [{ model: this._db.empresaRemplazo }, { model: this._db.cliente }] },
            ],
        });

    }

    getFindAllPublic(WHERE) {
        return this._db.arriendo.findAll({
            where: WHERE,
            include: [
                { model: this._db.usuario, attributes: ["nombre_usuario"] },
                { model: this._db.cliente },
                { model: this._db.empresa },
                { model: this._db.vehiculo },
                { model: this._db.pagoArriendo },
                { model: this._db.sucursal },
                { model: this._db.requisito },
                { model: this._db.garantia },
                { model: this._db.remplazo, include: [{ model: this._db.empresaRemplazo }, { model: this._db.cliente }] },
            ],
        });
    }


    getFindOnePublic(ID) {
        return this._db.arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                {
                    model: this._db.cliente, include: [{
                        model: this._db.documentoCliente,
                        attributes: ["carnetFrontal", "carnetTrasera", "comprobanteDomicilio"]
                    }]
                },
                {
                    model: this._db.empresa, include: [{
                        model: this._db.documentoEmpresa,
                        attributes: ["documentoEstatuto", "documentoRol", "documentoVigencia", "carnetFrontal", "carnetTrasera"]
                    }]
                },
                {
                    model: this._db.conductor, include: [{
                        model: this._db.documentoConductor,
                        attributes: ["licenciaConducirFrontal", "licenciaConducirTrasera"]
                    }]
                },
                { model: this._db.remplazo, include: [{ model: this._db.cliente, include: [{ model: this._db.documentoCliente, attributes: ["carnetFrontal", "carnetTrasera", "comprobanteDomicilio"] }] }, { model: this._db.empresaRemplazo }], },
                { model: this._db.vehiculo },
                {
                    model: this._db.requisito,
                    attributes: ["carnetFrontal_requisito", "carnetTrasera_requisito", "licenciaConducirFrontal_requisito",
                        "licenciaConducirTrasera_requisito", "tarjetaCredito_requisito", "chequeGarantia_requisito",
                        "comprobanteDomicilio_requisito", "cartaRemplazo_requisito", "boletaEfectivo_requisito",
                        "carpetaTributaria_requisito", "documentoEstatuto_requisito", "documentoRol_requisito",
                        "documentoVigencia_requisito", "cartaAutorizacion_requisito"]
                },
                { model: this._db.pagoArriendo, include: [{ model: this._db.pago, include: [{ model: this._db.facturacion }] }] },
                { model: this._db.sucursal },
                { model: this._db.contrato },
                { model: this._db.contacto },
                { model: this._db.fotoDespacho },
                { model: this._db.fotoRecepcion },
                { model: this._db.usuario, attributes: ["nombre_usuario"] },
                { model: this._db.garantia, include: { model: this._db.modoPago } },
                { model: this._db.despacho, include: [{ model: this._db.actaEntrega }] },
            ],
        });
    }

    getFindOneClients(ID) {
        return this._db.arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: this._db.cliente, include: [{ model: this._db.documentoCliente }] },
                { model: this._db.empresa, include: [{ model: this._db.documentoEmpresa }] },
                { model: this._db.conductor, include: [{ model: this._db.documentoConductor }] },
                { model: this._db.remplazo, include: [{ model: this._db.cliente, include: [{ model: this._db.documentoCliente }] }], },
            ],
        });
    }


    getFindAll() {
        return this._db.arriendo.findAll({
            include: [
                { model: this._db.usuario, attributes: ["nombre_usuario"] },
                { model: this._db.sucursal },
                { model: this._db.conductor },
                { model: this._db.vehiculo },
                { model: this._db.cliente },
                { model: this._db.empresa },
                { model: this._db.contrato },
                { model: this._db.requisito },
                { model: this._db.remplazo, include: [{ model: this._db.empresaRemplazo }, { model: this._db.cliente }] },
                { model: this._db.pagoExtra, include: [{ model: this._db.facturacion, include: [{ model: this._db.modoPago }], }] },
                { model: this._db.danioVehiculo, include: [{ model: this._db.pagoDanio, include: [{ model: this._db.facturacion, include: [{ model: this._db.modoPago }], }] }] },
                {
                    model: this._db.pagoArriendo,
                    include: [
                        { model: this._db.pagoAccesorio, include: [{ model: this._db.accesorio }] },
                        {
                            model: this._db.pago,
                            include: [
                                { model: this._db.facturacion, include: [{ model: this._db.modoPago }], },
                                { model: this._db.abono, include: [{ model: this._db.facturacion, include: [{ model: this._db.modoPago }], }] }
                            ],
                        }
                    ],
                },
            ],
        });
    }

    getFindAllRecepcionados(filter) {
        return this._db.arriendo.findAll({
            where: {
                [Op.and]: [
                    { estado_arriendo: "RECEPCIONADO", },
                    filter
                ],
            },
            include: [
                { model: this._db.pagoArriendo, include: [{ model: this._db.pago, include: { model: this._db.pagoArriendo } }, { model: this._db.contrato }] },
                { model: this._db.danioVehiculo },
                { model: this._db.sucursal }
            ],
        })
    }

    getFindOne(ID) {
        return this._db.arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: this._db.vehiculo },
                { model: this._db.cliente },
                { model: this._db.conductor },
                { model: this._db.contacto },
                { model: this._db.empresa },
                { model: this._db.sucursal },
                { model: this._db.contrato },
                { model: this._db.danioVehiculo, include: { model: this._db.pagoDanio } },
                { model: this._db.pagoExtra },
                { model: this._db.requisito },
                { model: this._db.usuario, attributes: ["nombre_usuario"] },
                { model: this._db.despacho, include: [{ model: this._db.actaEntrega }] },
                { model: this._db.remplazo, include: [{ model: this._db.cliente }] },
                { model: this._db.garantia, include: [{ model: this._db.modoPago }] },
                {
                    model: this._db.pagoArriendo,
                    include: [
                        { model: this._db.pago, include: { model: this._db.facturacion, include: { model: this._db.modoPago } } },
                        { model: this._db.pagoAccesorio, include: [{ model: this._db.accesorio }] },
                        { model: this._db.contrato },
                    ],
                },
            ],
        });
    }


    getFindOneMin(ID) {
        return this._db.arriendo.findOne({
            where: { id_arriendo: ID },
            include: [
                { model: this._db.cliente },
                { model: this._db.empresa },
                { model: this._db.contrato },
                { model: this._db.despacho, include: [{ model: this._db.actaEntrega }] },
                { model: this._db.remplazo, include: [{ model: this._db.cliente }] },
                { model: this._db.usuario, attributes: ["nombre_usuario"] },
                {
                    model: this._db.pagoArriendo,
                    include: [{ model: this._db.contrato }],
                },
            ],
        });
    }

}

module.exports = ArriendoRepository;