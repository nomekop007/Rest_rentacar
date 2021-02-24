const router = require("express").Router();
module.exports = ({ RemplazoController }) => {

    router.post("/registrarRemplazo", RemplazoController.createRemplazo.bind(RemplazoController));

    return router;
}

