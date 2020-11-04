const { Rol } = require("../database/db");
const { sendError } = require("../helpers/components");

class RolController {
    async getRoles(req, res) {
        try {
            const roles = await Rol.findAll({
                attributes: ["id_rol", "nombre_rol"],
            });
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