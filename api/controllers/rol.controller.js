class RolController {

    constructor({ RolService, RolRepository, sendError }) {
        this.sendError = sendError;
        this._rolService = RolService;

        //mover
        this._serviceRol = RolRepository;
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