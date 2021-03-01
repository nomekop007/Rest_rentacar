class SucursalRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.sucursal.findAll({
            include: [{ model: this._db.region }]
        });
    }

    getFindOne(ID) {
        return this._db.sucursal.findOne({
            where: { id_sucursal: ID },
        })
    }

    getFindById(ID) {
        return this._db.sucursal.findOne({
            where: { id_sucursal: ID },
            include: [
                { model: this._db.vehiculo, where: { estado_vehiculo: "DISPONIBLE" }, },
                {
                    model: this._db.region,
                    include: [{
                        model: this._db.vehiculo,
                        where: { estado_vehiculo: "DISPONIBLE" },
                    }]
                }
            ],
        });
    }

    postCreate(DATA) {
        return this._db.sucursal.create(DATA);
    }

    putUpdate(ID, DATA) {
        return this._db.sucursal.update(DATA, {
            where: { id_sucursal: ID },
        });
    }

    getArriendoBySucursal() {
        return this._db.sucursal.findAll({
            include: [{ model: this._db.arriendo }, { model: this._db.region }]
        })
    }




}

module.exports = SucursalRepository;