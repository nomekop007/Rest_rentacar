const { Accesorio, Arriendo } = require("../database/db");
const { sendError } = require("../helpers/components");

class AccesorioController {
    async getAccesorios(req, res) {
        try {
            const accesorio = await Accesorio.findAll();
            res.json({
                success: true,
                data: accesorio,
            });
        } catch (error) {
            sendError(error, res);
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
            sendError(error, res);
        }
    }
}

module.exports = AccesorioController;