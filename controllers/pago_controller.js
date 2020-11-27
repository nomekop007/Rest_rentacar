const { Pago } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoController {
    async createPago(req, res) {
        try {
            const response = req.body;
            console.log(response);
            const pago = await Pago.create(response);

            res.json({
                success: true,
                pago: pago,
                msg: "registro exitoso",
            });

        } catch (error) {
            sendError(error, res);
        }
    }



    async updatePagos(req, res, next) {
        try {

            const response = req.body;
            console.log(response)

            response.arrayPagos.map(async (pago) => {
                await Pago.update({ id_facturacion: response.id_facturacion, estado_pago: response.estado_pago }, {
                    where: { id_pago: pago.id_pago },
                });
            });

            res.json({
                success: true,
                msg: "Pago actualizado",
            });

        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = PagoController;