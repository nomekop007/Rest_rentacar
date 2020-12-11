const { Contacto } = require("../database/db");

class ContactoService {

    async postCreate(DATA) {
        return await Contacto.create(DATA);
    }

}

module.exports = ContactoService;