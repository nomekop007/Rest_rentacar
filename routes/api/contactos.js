const router = require("express").Router();
const ContactoController = require("../../controllers/contacto.controller");
const contacto = new ContactoController();

router.post("/registrarContacto", contacto.createContacto.bind(contacto));

router.put("/editarContacto/:id", contacto.updateContacto.bind(contacto));

module.exports = router;