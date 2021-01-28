const ContactoService = require("../services/contacto.service");
const { sendError } = require("../helpers/components");

class ContactoController {

    constructor() {
        this._serviceContacto = new ContactoService();
    }


    async createContacto(req, res, next) {
        try {
            const response = req.body;
            const contacto = await this._serviceContacto.postCreate(response);
            res.json({
                success: true,
                data: contacto,
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updateContacto(req, res, next) {
        try {
            await this._serviceContacto.putUpdate(req.body, req.params.id);
            res.json({
                success: true,
                msg: "contacto modificado"
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

}

module.exports = ContactoController;