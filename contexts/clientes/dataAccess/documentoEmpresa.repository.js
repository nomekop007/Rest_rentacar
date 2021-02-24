class DocumentoEmpresaRepository {

    constructor({ db }) {
        this._db = db;
    }

    postFindOrCreate(DATA, ID) {
        return this._db.documentoEmpresa.findOrCreate({
            where: { rut_empresa: ID },
            defaults: DATA,
        });
    }
    putUpdate(DATA, ID) {
        return this._db.documentoEmpresa.update(DATA, {
            where: { rut_empresa: ID },
        });
    }
}


module.exports = DocumentoEmpresaRepository;