const router = require("express").Router();

const { Empresa } = require("../../db");

router.get("/cargarEmpresas", async(req, res) => {
    const empresas = await Empresa.findAll({
        attributes: [
            "rut_empresa",
            "nombre_empresa",
            "rol_empresa",
            "correo_empresa",
        ],
    });
    res.json({
        success: true,
        data: empresas,
    });
});

module.exports = router;