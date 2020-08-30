const router = require("express").Router();

const { Sucursal } = require("../../db");

router.get("/", async (req, res) => {
  const sucursales = await Sucursal.findAll();
  res.json({
    success: true,
    data: sucursales,
  });
});

module.exports = router;
