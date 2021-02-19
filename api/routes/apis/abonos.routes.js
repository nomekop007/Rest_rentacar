const router = require("express").Router();
module.exports = ({ AbonoController }) => {

    router.post("/registrarAbono", AbonoController.createAbonoWithFacturacion.bind(AbonoController));

    return router;
}
