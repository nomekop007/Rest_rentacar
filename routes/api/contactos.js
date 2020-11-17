const router = require("express").Router();
const ContactoController = require("../../controllers/contacto_controller");
const contacto = new ContactoController();

router.post("/registrarContacto", contacto.createContacto.bind(contacto));

module.exports = router;