const RolService = require("../services/rol.service");
const { sendError } = require("../helpers/components");
class RolController {

    constructor() {
        this._serviceRol = new RolService();
    }


    async getRoles(req, res) {
        try {
            const roles = await this._serviceRol.getFindAll();
            res.json({ success: true, data: roles, });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createRol(req, res) {
        try {
            const rol = await this._serviceRol.postCreate(req.body);
            res.json({ success: true, data: rol })
        } catch (error) {
            sendError(error, req, res);
        }
    }




}

module.exports = RolController;