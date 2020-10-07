const { Propietario } = require("../db");

class PropietarioController {
    async getPropietario(req, res) {
        const propietario = await Propietario.findAll({
            attributes: ["rut_propietario", "nombre_propietario"],
        });
        res.json({
            success: true,
            data: propietario,
        });
    }

}

module.exports = PropietarioController;