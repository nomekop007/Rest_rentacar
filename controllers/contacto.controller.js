const { Contacto } = require("../database/db");
const { sendError } = require("../helpers/components");

class ContactoController {

    async createContacto(req, res) {
        try {
            const response = req.body;

            const contacto = await Contacto.create(response);

            res.json({
                success: true,
                data: contacto,
            });

        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = ContactoController;