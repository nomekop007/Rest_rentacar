const ContactoService = require("../services/contacto.service");
const { sendError } = require("../helpers/components");

class ContactoController {

    constructor() {
        this.serviceContacto = new ContactoService();
    }


    async createContacto(req, res) {
        try {
            const response = req.body;
            const contacto = await this.serviceContacto.postCreate(response);
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