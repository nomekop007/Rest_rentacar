class SucursalRepository {

    constructor({ db }) {
        this.db = db;
    }

    getFindAll() {
        return this.db.sucursal.findAll({
            include: [{ model: this.db.region }]
        });
    }

    getFindOne(ID) {
        return this.db.sucursal.findOne({
            where: { id_sucursal: ID },
        })
    }

    getFindById(ID) {
        return this.db.sucursal.findOne({
            where: { id_sucursal: ID },
            include: [
                {
                    model: this.db.region,
                    include: [{
                        model: this.db.vehiculo,
                        where: { estado_vehiculo: "DISPONIBLE" },
                        attributes: [
                            "patente_vehiculo",
                            "modelo_vehiculo",
                            "año_vehiculo",
                            "marca_vehiculo",
                        ],
                    },]
                }
            ],
        });
    }

    postCreate(DATA) {
        return this.db.sucursal.create(DATA);
    }

    putUpdate(ID, DATA) {
        return this.db.sucursal.update(DATA, {
            where: { id_sucursal: ID },
        });
    }

    getArriendoBySucursal() {
        return this.db.sucursal.findAll({
            include: [{ model: this.db.arriendo }, { model: this.db.region }]
        })
    }




}

module.exports = SucursalRepository;