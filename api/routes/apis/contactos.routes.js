const router = require("express").Router();
module.exports = ({ ContactoController }) => {

    router.post("/registrarContacto", ContactoController.createContacto.bind(ContactoController));
    router.put("/editarContacto/:id", ContactoController.updateContacto.bind(ContactoController));

    return router;
}

