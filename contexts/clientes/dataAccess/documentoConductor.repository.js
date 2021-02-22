class DocumentoConductorRepository {

    constructor({ db }) {
        this._db = db;
    }

    postFindOrCreate(DATA, ID) {
        return this._db.documentoConductor.findOrCreate({
            where: { rut_conductor: ID },
            defaults: DATA,
        });
    }

    putUpdate(DATA, ID) {
        return this._db.documentoConductor.update(DATA, {
            where: { rut_conductor: ID },
        });
    }

}

module.exports = DocumentoConductorRepository;