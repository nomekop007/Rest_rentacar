const router = require("express").Router();

const { Conductor } = require("../../db");

router.get("/cargarConductores", async(req, res) => {
    const conductores = await Conductor.findAll({
        attributes: [
            "rut_conductor",
            "nombre_conductor",
            "clase_conductor",
            "telefono_conductor",
        ],
    });
    res.json({
        success: true,
        data: conductores,
    });
});

module.exports = router;