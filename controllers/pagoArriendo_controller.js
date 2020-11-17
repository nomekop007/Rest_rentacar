const { PagoArriendo, Arriendo } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoArriendoController {
    async createPagoArriendo(req, res) {
        try {
            const response = req.body;


            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: response.id_arriendo },
            });


            if (arriendo.estado_arriendo == "PENDIENTE" || arriendo.estado_arriendo == "EXTENDIDO") {

                const pagoArriendo = await PagoArriendo.create(response);

                res.json({
                    success: true,
                    pagoArriendo: pagoArriendo,
                    msg: "registro exitoso",
                });
            } else {
                res.json({
                    success: false,
                    msg: "este arriendo ya tiene registrado el pago"
                });
            }

        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = PagoArriendoController;