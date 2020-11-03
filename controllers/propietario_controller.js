const { Propietario } = require("../db");
const { sendError } = require("../helpers/components");

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
            sendError(error, res);
        }
    }
}

module.exports = PropietarioController;