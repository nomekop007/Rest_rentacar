class ConductorRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.conductor.findAll();
    }


    getFindByPK(ID) {
        return this._db.conductor.findByPk(ID);
    }

    getFindOne(ID) {
        return this._db.conductor.findOne({
            where: { rut_conductor: ID },
            include: [{ model: this._db.documentoConductor, attributes: ["licenciaConducirFrontal", "licenciaConducirTrasera"] }]
        })
    }

    postFindOrCreate(DATA, ID) {
        return this._db.conductor.findOrCreate({
            where: { rut_conductor: ID },
            defaults: DATA,
        });
    }


    putUpdate(DATA, ID) {
        return this._db.conductor.update(DATA, {
            where: { rut_conductor: ID },
        });
    }

}

module.exports = ConductorRepository;