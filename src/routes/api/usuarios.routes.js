
const router = require("express").Router();
const { check } = require("express-validator");
validacionPost = [
    check("id_rol", "El rol es obligatorio").not().isEmpty(),
    check("id_sucursal", "la sucursal es obligatorio").not().isEmail(),
    check("clave_usuario", "La constraseña es obligatoria").not().isEmpty(),
    check("email_usuario", "El email debe ser correcto").isEmail(),
];
module.exports = ({ UsuarioController, checkMiddleware }) => {

    router.post("/login", UsuarioController.loginUsuario.bind(UsuarioController));
    router.post("/registrar", checkMiddleware.checkToken, validacionPost, UsuarioController.createUsuario.bind(UsuarioController));
    router.get("/validarUsuario/:usertoken", checkMiddleware.checkToken, UsuarioController.validarUsuario.bind(UsuarioController));
    router.get("/cargarUsuarios", checkMiddleware.checkToken, UsuarioController.getUsuarios.bind(UsuarioController));
    router.get("/buscarUsuario/:id", checkMiddleware.checkToken, UsuarioController.findUsuario.bind(UsuarioController));
    router.put("/editarUsuario/:id", checkMiddleware.checkToken, UsuarioController.updateUsuario.bind(UsuarioController));
    router.put("/cambiarEstado/:id", checkMiddleware.checkToken, UsuarioController.stateUsuario.bind(UsuarioController));

    return router;
}

