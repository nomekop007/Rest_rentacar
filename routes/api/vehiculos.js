const router = require("express").Router();

const { Vehiculo, Sucursal } = require("../../db");

router.get("/cargarVehiculos", async(req, res) => {
    const vehiculos = await Vehiculo.findAll({
        include: [{ model: Sucursal, attributes: ["nombre_sucursal"] }],
        attributes: [
            "patente_vehiculo",
            "modelo_vehiculo",
            "año_vehiculo",
            "tipo_vehiculo",
        ],
    });
    res.json({
        success: true,
        data: vehiculos,
    });
});

router.post("/registrarVehiculo", async(req, res) => {
    const response = req.body;

    const [v, created] = await Vehiculo.findOrCreate({
        where: { patente_vehiculo: req.body.patente_vehiculo },
        defaults: response,
    });

    if (created) {
        const vehiculo = await Vehiculo.findAll({
            include: [{ model: Sucursal, attributes: ["nombre_sucursal"] }],
            where: { patente_vehiculo: v.patente_vehiculo },
            attributes: [
                "patente_vehiculo",
                "modelo_vehiculo",
                "año_vehiculo",
                "tipo_vehiculo",
            ],
        });

        res.json({
            success: true,
            msg: " Vehiculo creado exitosamente",
            data: vehiculo,
        });
    } else {
        res.json({
            success: false,
            msg: " Vehiculo ya existe",
        });
    }
});

router.put("/editarVehiculo/:vehiculoId", async(req, res) => {
    await Vehiculo.update(req.body, {
        where: { patente_vehiculo: req.params.vehiculoId },
    });

    res.json({
        success: true,
        msg: "Vehiculo modificado exitosamente",
        data: req.body,
    });
});

router.delete("/eliminarVehiculo/:vehiculoId", async(req, res) => {
    await Vehiculo.destroy({
        where: { patente_vehiculo: req.params.vehiculoId },
    });
    res.json({
        success: true,
        msg: " Vehiculo borrado exitosamente",
        data: req.params.vehiculoId,
    });
});

module.exports = router;