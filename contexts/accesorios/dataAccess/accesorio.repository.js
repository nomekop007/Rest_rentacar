class AccesorioRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.accesorio.findAll({
            include: [{ model: this._db.sucursal }],
            order: [
                ['id_accesorio', 'DESC'],
            ]
        });
    }

    getFindAllBySucursal(ID) {
        return this._db.accesorio.findAll({
            where: { id_sucursal: ID },
            include: [{ model: this._db.sucursal }]
        })
    }

    postCreate(DATA) {
        return this._db.accesorio.create(DATA);
    }

    putUpdate(DATA, ID) {
        return this._db.accesorio.update(DATA, {
            where: { id_accesorio: ID },
        });
    }

    getFindByPk(ID) {
        return this._db.accesorio.findByPk(ID);
    }

}


module.exports = AccesorioRepository;