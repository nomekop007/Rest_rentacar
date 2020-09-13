const router = require("express").Router();

const Sucursal_controller = require("../../controllers/sucursal_controller");
const sucursal = new Sucursal_controller();

router.get("/cargarSucursales", sucursal.getSucursales.bind(sucursal));

router.get(
  "/cargarVehiculos/:id_sucursal",
  sucursal.getFindVehiculosPorSucursal.bind(sucursal)
);

module.exports = router;
