const router = require("express").Router();
const PDFController = require("../../controllers/pdf_controller");
const pdf = new PDFController();

router.post("/crearContratoArriendoPDF", pdf.createContratoArriendoPDF.bind(pdf));

module.exports = router;