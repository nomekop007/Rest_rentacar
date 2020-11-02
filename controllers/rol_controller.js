const { Rol } = require("../db");

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
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }
}

module.exports = RolController;