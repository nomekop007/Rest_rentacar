class ConductorRepository {

    constructor({ db }) {
        this.db = db;
    }

    getFindAll() {
        return this.db.conductor.findAll();
    }


    getFindByPK(ID) {
        return this.db.conductor.findByPk(ID);
    }

    getFindOne(ID) {
        return this.db.conductor.findOne({
            where: { rut_conductor: ID },
            include: [{ model: this.db.documentoConductor, attributes: ["licenciaConducirFrontal", "licenciaConducirTrasera"] }]
        })
    }

    postFindOrCreate(DATA, ID) {
        return this.db.conductor.findOrCreate({
            where: { rut_conductor: ID },
            defaults: DATA,
        });
    }


    putUpdate(DATA, ID) {
        return this.db.conductor.update(DATA, {
            where: { rut_conductor: ID },
        });
    }

}

module.exports = ConductorRepository;