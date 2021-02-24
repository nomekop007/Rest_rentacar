class RolController {

    constructor({ RolRepository, sendError }) {
        this._serviceRol = RolRepository;
        this.sendError = sendError;
    }


    async getRoles(req, res) {
        try {
            const roles = await this._serviceRol.getFindAll();
            res.json({ success: true, data: roles, });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createRol(req, res) {
        try {
            const rol = await this._serviceRol.postCreate(req.body);
            res.json({ success: true, data: rol })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }








}

module.exports = RolController;