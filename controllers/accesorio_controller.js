const { Accesorio, Arriendo } = require("../db");

class AccesorioController {
    async getAccesorios(req, res) {
        try {
            const accesorio = await Accesorio.findAll();
            res.json({
                success: true,
                data: accesorio,
            });
        } catch (error) {
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }

    async createArriendoAccesorio(req, res) {
        try {
            const { ArrayChecks, id_arriendo } = req.body;

            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: id_arriendo },
            });

            for (let i = 0; i < ArrayChecks.length; i++) {
                const accesorio = await Accesorio.findOne({
                    where: { id_accesorio: ArrayChecks[i] },
                });
                //se registra en la tabla arriendos-accesorios
                await arriendo.addAccesorios(accesorio);
            }

            res.json({
                success: true,
                msg: "registro exitoso",
            });
        } catch (error) {
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }
}

module.exports = AccesorioController;