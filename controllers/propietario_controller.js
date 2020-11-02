const { Propietario } = require("../db");

class PropietarioController {
    async getPropietario(req, res) {
        try {
            const propietario = await Propietario.findAll({
                attributes: ["rut_propietario", "nombre_propietario"],
            });
            res.json({
                success: true,
                data: propietario,
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

module.exports = PropietarioController;