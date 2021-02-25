const router = require("express").Router();
module.exports = ({ DefaultValuesController }) => {

    router.get("/", DefaultValuesController.createTableDefault.bind(DefaultValuesController));
    router.get("/cargarVehiculos", DefaultValuesController.createDefaultCars.bind(DefaultValuesController));

    return router;
}
