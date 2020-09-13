const router = require("express").Router();
const UsuarioController = require("../../controllers/usuario_controller");
const usuario = new UsuarioController();
const { check } = require("express-validator");
validacionPost = [
  check("id_rol", "El rol es obligatorio").not().isEmpty(),
  check("id_sucursal", "la sucursal es obligatorio").not().isEmail(),
  check("clave_usuario", "La constraseña es obligatoria").not().isEmpty(),
  check("email_usuario", "El email debe ser correcto").isEmail(),
];

router.get("/cargarUsuarios", usuario.getUsuarios.bind(usuario));

router.post("/registrar", validacionPost, usuario.createUsuario.bind(usuario));

router.post("/login", usuario.loginUsuario.bind(usuario));

module.exports = router;
