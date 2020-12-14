const RolService = require("../services/rol.service");
const { sendError } = require("../helpers/components");
class RolController {

    constructor() {
        this.serviceRol = new RolService();
    }


    async getRoles(req, res) {
        try {
            const roles = await this.serviceRol.getFindAll();
            res.json({
                success: true,
                data: roles,
            });
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = RolController;