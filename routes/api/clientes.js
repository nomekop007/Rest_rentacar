const router = require("express").Router();

const { Cliente } = require("../../db");

router.get("/cargarClientes", async(req, res) => {
    const cliente = await Cliente.findAll({
        attributes: [
            "rut_cliente",
            "nombre_cliente",
            "telefono_cliente",
            "correo_cliente",
        ],
    });
    res.json({
        success: true,
        data: cliente,
    });
});

router.get("/buscarCliente/:id", async(req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
        res.json({
            success: true,
            data: cliente,
        });
    } else {
        res.json({
            success: false,
            msg: "sin datos",
        });
    }
});

module.exports = router;