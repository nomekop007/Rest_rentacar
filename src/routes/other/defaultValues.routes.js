const router = require("express").Router();
module.exports = ({ DefaultValuesComponent }) => {

    router.get("/", DefaultValuesComponent.createTableDefault.bind(DefaultValuesComponent));
    router.get("/cargarVehiculos", DefaultValuesComponent.createDefaultCars.bind(DefaultValuesComponent));

    return router;
}
