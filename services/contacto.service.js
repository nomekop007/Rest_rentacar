const { Contacto } = require("../config/database/db");

class ContactoService {

    async postCreate(DATA) {
        return await Contacto.create(DATA);
    }


    async putUpdate(DATA, ID) {
        return await Contacto.update(DATA, {
            where: { id_contacto: ID },
        });
    }

}

module.exports = ContactoService;