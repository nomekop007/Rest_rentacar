const BaseRepository = require("../../base/dataAccess/base.repository");

class ContactoRepository extends BaseRepository {

    constructor({ db }) {
        super(db, "contacto");
        this._db = db;
    }

    postCreate(DATA) {
        return this._db.contacto.create(DATA);
    }


    putUpdate(DATA, ID) {
        return this._db.contacto.update(DATA, {
            where: { id_contacto: ID },
        });
    }

}

module.exports = ContactoRepository;