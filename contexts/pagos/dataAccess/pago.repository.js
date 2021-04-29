const BaseRepository = require("../../base/dataAccess/base.repository");
const { Op } = require("sequelize");

class PagoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "pago");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.pago.create(DATA);
    }


    putUpdate(DATA, ID) {
        return this._db.pago.update(DATA, {
            where: { id_pago: ID },
        });
    }

    getFindAllBySucursal(WHERE) {
        return this._db.pago.findAll({
            include: [
                { model: this._db.pagoArriendo, include: { model: this._db.arriendo, include: { model: this._db.sucursal, where: WHERE } } },
                { model: this._db.abono }
            ]
        });
    }

    getFindAllPendientes(WHERE) {
        return this._db.pago.findAll({
            where: WHERE,
            include: [
                {
                    model: this._db.pagoArriendo, include: [
                        {
                            model: this._db.arriendo, include: [
                                { model: this._db.sucursal },
                                { model: this._db.requisito },
                                { model: this._db.remplazo, include: { model: this._db.cliente } },
                            ]
                        },
                        { model: this._db.extencion }
                    ]
                },
                { model: this._db.abono }
            ]
        });
    }



    getFindAllPendientesFiltro(inputSucursal, clave_empresaRemplazo, inputEstado) {
        let estados = [];
        switch (inputEstado) {
            case 'PORFACTURAR':
                estados = ["FINALIZADO", "RECEPCIONADO"];
                break;
            case 'NORECEPCIONADO':
                estados = ["ACTIVO", "FIRMADO", "CONFIRMADO", "PENDIENTE"];
                break;
            default://TODOS
                estados = ["FINALIZADO", "RECEPCIONADO", "ACTIVO", "FIRMADO", "CONFIRMADO", "PENDIENTE"];
                break;
        }


        return this._db.pago.findAll({
            where: { estado_pago: "PENDIENTE", deudor_pago: clave_empresaRemplazo },
            include: [
                {
                    model: this._db.pagoArriendo, include: [
                        {
                            model: this._db.arriendo,
                            where: { id_sucursal: inputSucursal, estado_arriendo: estados, },
                            include: [
                                { model: this._db.sucursal },
                                { model: this._db.requisito },
                                { model: this._db.remplazo, include: { model: this._db.cliente } },
                            ]
                        },
                        { model: this._db.extencion }
                    ]
                },
                { model: this._db.abono }
            ]
        });
    }

    getFindAllById(WHERE) {
        return this._db.pago.findAll({
            where: {
                [Op.or]: WHERE
            }
        })
    }


    getFindOne(ID) {
        return this._db.pago.findOne({
            where: { id_pago: ID },
            include: [
                { model: this._db.pagoArriendo, include: { model: this._db.arriendo } },
                { model: this._db.facturacion, include: { model: this._db.modoPago } },
                { model: this._db.abono, include: { model: this._db.facturacion, include: { model: this._db.modoPago } } }
            ]
        })
    }


    getFindAllByArriendo(ID) {
        return this._db.pago.findAll({
            include: [{ model: this._db.pagoArriendo, where: { id_arriendo: ID } }]
        })
    }



}

module.exports = PagoRepository;