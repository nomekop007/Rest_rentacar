const BaseRepository = require("../../base/dataAccess/base.repository");

class DocumentoEmpresaRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "documentoEmpresa");
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