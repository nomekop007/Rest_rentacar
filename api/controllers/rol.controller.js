class RolController {

    constructor({ RolService, sendError }) {
        this.sendError = sendError;
        this._rolService = RolService;
    }


    async getRoles(req, res) {
        try {
            const roles = await this._rolService.getRoles();
            res.json({ success: true, data: roles, });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createRol(req, res) {
        try {
            const rol = req.body;
            const rolRepo = await this._rolService.createRol(rol);
            res.json({ success: true, data: rolRepo })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }








}

module.exports = RolController;