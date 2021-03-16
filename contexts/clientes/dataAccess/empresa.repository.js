const BaseRepository = require("../../base/dataAccess/base.repository");

class EmpresaRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "empresa");
        this._db = db;
    }

    getFindAll() {
        return this._db.empresa.findAll();
    }


    getFindByPk(ID) {
        return this._db.empresa.findByPk(ID);
    }

    getFindOne(ID) {
        return this._db.empresa.findOne({
            where: { rut_empresa: ID },
            include: [{ model: this._db.documentoEmpresa, attributes: ["carnetFrontal", "carnetTrasera", "documentoEstatuto", "documentoRol", "documentoVigencia"] }]
        })
    }


    postfindOrCreate(DATA, ID) {
        return this._db.empresa.findOrCreate({
            where: { rut_empresa: ID },
            defaults: DATA,
        });
    }


    putUpdate(DATA, ID) {
        return this._db.empresa.update(DATA, {
            where: { rut_empresa: ID },
        });
    }
}

module.exports = EmpresaRepository;