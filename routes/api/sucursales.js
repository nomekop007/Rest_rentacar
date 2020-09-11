const router = require("express").Router();

const { Sucursal, Vehiculo } = require("../../db");

router.get("/cargarSucursales", async(req, res) => {
    const sucursales = await Sucursal.findAll({
        attributes: ["id_sucursal", "nombre_sucursal"],
    });
    res.json({
        success: true,
        data: sucursales,
    });
});

router.get("/cargarVehiculos/:id_sucursal", async(req, res) => {
    const vehiculo = await Vehiculo.findAll({
        where: {
            id_sucursal: req.params.id_sucursal,
            estado_vehiculo: "DISPONIBLE",
        },
        attributes: ["patente_vehiculo", "modelo_vehiculo", "año_vehiculo"],
    });

    res.json({
        success: true,
        data: vehiculo,
    });
});

module.exports = router;