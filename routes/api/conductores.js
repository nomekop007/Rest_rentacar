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

router.get("/cargarUnConductor/:id", async(req, res) => {
    const conductor = await Conductor.findByPk(req.params.id);

    if (conductor) {
        res.json({
            success: true,
            data: conductor,
        });
    } else {
        res.json({
            success: false,
            msg: "sin datos",
        });
    }
});

module.exports = router;