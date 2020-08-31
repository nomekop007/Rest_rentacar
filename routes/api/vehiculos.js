const router = require("express").Router();

const { Vehiculo, Sucursal } = require("../../db");

router.get("/", async (req, res) => {
  const vehiculos = await Vehiculo.findAll({
    include: Sucursal,
  });
  res.json({
    success: true,
    data: vehiculos,
  });
});

router.post("/", async (req, res) => {
  const vehiculo = await Vehiculo.create(req.body);
  res.json({
    success: true,
    msg: " Vehiculo creado exitosamente",
    data: vehiculo,
  });
});

router.put("/:vehiculoId", async (req, res) => {
  await Vehiculo.update(req.body, {
    where: { patente_vehiculo: req.params.vehiculoId },
  });

  res.json({
    success: true,
    msg: "Vehiculo modificado exitosamente",
    data: req.body,
  });
});

router.delete("/:vehiculoId", async (req, res) => {
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
