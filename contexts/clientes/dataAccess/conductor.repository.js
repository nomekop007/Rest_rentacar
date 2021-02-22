class ConductorRepository {

    constructor({ db }) {
        this.db = db;
    }

    getFindAll() {
        this.db.conductor.findAll();
    }


    getFindByPK(ID) {
        this.db.conductor.findByPk(ID);
    }

    getFindOne(ID) {
        this.db.conductor.findOne({
            where: { rut_conductor: ID },
            include: [{ model: this.db.documentoConductor, attributes: ["licenciaConducirFrontal", "licenciaConducirTrasera"] }]
        })
    }

    postFindOrCreate(DATA, ID) {
        this.db.conductor.findOrCreate({
            where: { rut_conductor: ID },
            defaults: DATA,
        });
    }


    putUpdate(DATA, ID) {
        this.db.conductor.update(DATA, {
            where: { rut_conductor: ID },
        });
    }

}

module.exports = ConductorRepository;