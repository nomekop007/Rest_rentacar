const router = require("express").Router();

const { Sucursal, Vehiculo } = require("../../db");

router.get("/cargarSucursales", async(req, res) => {
    const sucursales = await Sucursal.findAll();
    res.json({
        success: true,
        data: sucursales,
    });
});

router.post("/cargarVehiculos:id_sucursal", async(req, res) => {
    const sucursales = await Sucursal.findOne({
        where: { id_sucursal: req.params.id_sucursal },
        include: Vehiculo,
    });
    res.json({
        success: true,
        data: sucursales,
    });
});

module.exports = router;