class ContactoController {

    constructor({ ContactoRepository, sendError }) {
        this._serviceContacto = ContactoRepository;
        this.sendError = sendError
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
        }
    }

}

module.exports = ContactoController;