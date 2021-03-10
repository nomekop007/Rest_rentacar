class ReservaRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll(ID_SUCURSAL) {
        return this._db.reserva.findAll({
            where: { id_sucursal: ID_SUCURSAL },
            include: [{ model: this._db.vehiculo }, { model: this._db.reservaClienteWeb }, { model: this._db.reservaCliente, include: [{ model: this._db.cliente }] }, { model: this._db.reservaEmpresa, include: [{ model: this._db.empresa }] }]
        });
    }

    getFindOne(ID) {
        return this._db.reserva.findByPk(ID);
    }


    putUpdate(DATA, ID) {
        return this._db.reserva.update(DATA, {
            where: { id_reserva: ID }
        })
    }

    postCreateWithClient(DATA) {
        return this._db.reserva.create(DATA, {
            include: [this._db.reservaCliente, this._db.reservaEmpresa, this._db.reservaClienteWeb]
        });
    }


    deleteDestroy(ID) {
        return this._db.reserva.destroy({
            where: { id_reserva: ID }
        })
    }

}

module.exports = ReservaRepository;