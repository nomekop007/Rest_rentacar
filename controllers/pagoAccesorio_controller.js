const { PagoAccesorio } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoAccesorioController {
    async createPagoAccesorios(req, res) {
        try {
            const response = req.body;

            for (let i = 0; i < response.matrizAccesorios[0].length; i++) {
                const nombre = response.matrizAccesorios[0][i];
                const precio = response.matrizAccesorios[1][i];
                const data = {
                    nombre_pagoAccesorio: nombre,
                    precioVenta_pagoAccesorio: Number(precio),
                    userAt: response.userAt,
                    id_pagoArriendo: response.id_pagoArriendo,
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