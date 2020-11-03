const router = require("express").Router();
const token = require("../../middlewares/check_middleware");
const { check } = require("express-validator");
const UsuarioController = require("../../controllers/usuario_controller");
const usuario = new UsuarioController();

validacionPost = [
    check("id_rol", "El rol es obligatorio").not().isEmpty(),
    check("id_sucursal", "la sucursal es obligatorio").not().isEmail(),
    check("clave_usuario", "La constraseña es obligatoria").not().isEmpty(),
    check("email_usuario", "El email debe ser correcto").isEmail(),
];

router.post("/login", usuario.loginUsuario.bind(usuario));

router.post(
    "/registrar",
    token.checkToken,
    validacionPost,
    usuario.createUsuario.bind(usuario)
);

router.get(
    "/cargarUsuarios",
    token.checkToken,
    usuario.getUsuarios.bind(usuario)
);

router.get(
    "/buscarUsuario/:id",
    token.checkToken,
    usuario.findUsuario.bind(usuario)
);

router.put(
    "/editarUsuario/:id",
    token.checkToken,
    usuario.updateUsuario.bind(usuario)
);

router.put(
    "/cambiarEstado/:id",
    token.checkToken,
    usuario.stateUsuario.bind(usuario)
);

module.exports = router;