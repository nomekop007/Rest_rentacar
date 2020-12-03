const router = require("express").Router();
const DefaultComponent = require("../../components/defaults_component")
const defautls = new DefaultComponent();

router.get("/", defautls.createTableDefault.bind(defautls));

router.get("/cargarVehiculos", defautls.createDefaultCars.bind(defautls));

module.exports = router;