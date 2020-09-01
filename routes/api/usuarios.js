const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");

const { Usuario } = require("../../db");

validacionPost = [
    check("id_rol", "El rol es obligatorio").not().isEmpty(),
    check("clave_usuario", "La constraseña es obligatoria").not().isEmpty(),
    check("email_usuario", "El email debe ser correcto").isEmail(),
];

router.post("/registrar", validacionPost, async(req, res) => {
    //valida los datos ingresados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //encripta la password
    req.body.clave_usuario = bcrypt.hashSync(req.body.clave_usuario, 10);
    const usuario = await Usuario.create(req.body);
    res.json({
        success: true,
        msg: "Usuario creado exitosamente",
        data: usuario,
    });
});

router.post("/login", async(req, res) => {
    const usuario = await Usuario.findOne({
        where: { email_usuario: req.body.email_usuario },
    });

    if (usuario) {
        //compara las password
        if (bcrypt.compareSync(req.body.clave_usuario, usuario.clave_usuario)) {
            res.json({
                success: true,
                usuario: {
                    nombre_usuario: usuario.nombre_usuario,
                    email_usuario: usuario.email_usuario,
                    id_rol: usuario.id_rol,
                    userToken: crearToken(usuario),
                },
            });
        } else {
            res.json({
                success: false,
                msg: "Error en usuario y/o constraseña",
            });
        }
    } else {
        res.json({
            success: false,
            msg: "Error en usuario y/o constraseña",
        });
    }
});

const crearToken = (usuario) => {
    const payload = {
        usuarioId: usuario.id_usuario,
        createAt: moment().unix(),
        expiredAt: moment().add(8, "hours").unix(),
    };
    return jwt.encode(payload, "frase secreta");
};

module.exports = router;