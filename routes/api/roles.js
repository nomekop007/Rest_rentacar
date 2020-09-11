const router = require("express").Router();

const { Rol } = require("../../db");

router.get("/cargarRoles", async(req, res) => {
    const roles = await Rol.findAll({
        attributes: ["id_rol", "nombre_rol"],
    });
    res.json({
        success: true,
        data: roles,
    });
});

module.exports = router;