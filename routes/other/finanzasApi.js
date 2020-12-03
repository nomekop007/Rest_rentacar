const router = require("express").Router();
const FinanzasComponent = require("../../components/finanzas_component");
const finanzas = new FinanzasComponent();

router.get("/mostrarArriendoFinanzas", finanzas.getArriendoFinanzas.bind(finanzas));

router.get("/buscarArriendoFinanzas/:id", finanzas.findArriendoFinanzas.bind(finanzas));

router.post("/buscarDocumentosArriendoFinanzas/", finanzas.findDocumentosArriendoFinanzas.bind(finanzas));


module.exports = router;