const router = require("express").Router();
const { check } = require("express-validator");
const UsuarioController = require("../../controllers/usuario_controller");
const usuario = new UsuarioController();

validacionPost = [
    check("id_rol", "El rol es obligatorio").not().isEmpty(),
    check("id_sucursal", "la sucursal es obligatorio").not().isEmail(),
    check("clave_usuario", "La constraseña es obligatoria").not().isEmpty(),
    check("email_usuario", "El email debe ser correcto").isEmail(),
];

router.post("/registrar", validacionPost, usuario.createUsuario.bind(usuario));

router.post("/login", usuario.loginUsuario.bind(usuario));

router.get("/cargarUsuarios", usuario.getUsuarios.bind(usuario));

router.get("/buscarUsuario/:id", usuario.findUsuario.bind(usuario));

router.put("/editarUsuario/:id", usuario.updateUsuario.bind(usuario));

router.put("/cambiarEstado/:id", usuario.stateUsuario.bind(usuario));

module.exports = router;