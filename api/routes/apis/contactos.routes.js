const router = require("express").Router();
module.exports = ({ ArriendoController }) => {

    router.post("/registrarContacto", ArriendoController.createContacto.bind(ArriendoController));
    router.put("/editarContacto/:id", ArriendoController.updateContacto.bind(ArriendoController));

    return router;
}

