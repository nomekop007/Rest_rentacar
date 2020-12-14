const router = require("express").Router();

const Sucursal_controller = require("../../controllers/sucursal.controller");
const sucursal = new Sucursal_controller();

router.get("/cargarSucursales", sucursal.getSucursales.bind(sucursal));

router.get(
    "/cargarVehiculos/:name",
    sucursal.getFindVehiculosPorSucursal.bind(sucursal)
);

module.exports = router;