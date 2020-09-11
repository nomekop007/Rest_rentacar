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

router.get("/buscarEmpresa/:id", async(req, res) => {
    const empresa = await Empresa.findByPk(req.params.id);

    if (empresa) {
        res.json({
            success: true,
            data: empresa,
        });
    } else {
        res.json({
            success: false,
            msg: "sin datos",
        });
    }
});

module.exports = router;