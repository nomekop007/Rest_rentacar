const router = require("express").Router();
const RegionController = require("../../controllers/regiones");
const region = new RegionController();

router.get("/cargarRegiones", region.getRegiones.bind(region));


module.exports = router;
