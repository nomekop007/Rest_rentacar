const BaseRepository = require("../../base/dataAccess/base.repository");


class DocumentoClienteRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "documentoCliente");
        this._db = db;
    }

    postFindOrCreate(DATA, ID) {
        return this._db.documentoCliente.findOrCreate({
            where: { rut_cliente: ID },
            defaults: DATA,
        });
    }

    putUpdate(DATA, ID) {
        return this._db.documentoCliente.update(DATA, {
            where: { rut_cliente: ID },
        });
    }

}

module.exports = DocumentoClienteRepository;