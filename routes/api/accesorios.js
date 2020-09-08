const router = require("express").Router();

const { Accesorio } = require("../../db");

router.get("/cargarAccesorios", async(req, res) => {
    const accesorio = await Accesorio.findAll();
    res.json({
        success: true,
        data: accesorio,
    });
});

module.exports = router;