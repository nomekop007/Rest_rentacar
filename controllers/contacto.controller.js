const ContactoService = require("../services/contacto.service");
const { sendError } = require("../helpers/components");

class ContactoController {

    constructor() {
        this.serviceContacto = new ContactoService();
    }


    async createContacto(req, res, next) {
        try {
            const response = req.body;
            const contacto = await this.serviceContacto.postCreate(response);
            res.json({
                success: true,
                data: contacto,
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }

    async updateContacto(req, res, next) {
        try {
            await this.serviceContacto.putUpdate(req.body, req.params.id);
            res.json({
                success: true,
                msg: "contacto modificado"
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }

}

module.exports = ContactoController;