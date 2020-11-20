const { PagoAccesorio } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoAccesorioController {
    async createPagoAccesorios(req, res) {
        try {
            const response = req.body;

            for (let i = 0; i < response.matrizAccesorios[0].length; i++) {
                const id_accesorio = response.matrizAccesorios[0][i];
                const precioVenta = response.matrizAccesorios[1][i];
                const data = {
                    precioVenta_pagoAccesorio: Number(precioVenta),
                    id_accesorio: id_accesorio,
                    id_pagoArriendo: response.id_pagoArriendo,
                    userAt: response.userAt,
                };
                await PagoAccesorio.create(data);
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

module.exports = PagoAccesorioController;