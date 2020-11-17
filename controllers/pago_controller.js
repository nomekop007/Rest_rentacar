const { Pago, Facturacion, PagoArriendo, PagoAccesorio, Arriendo, Cliente, Empresa, Remplazo, EmpresaRemplazo } = require("../database/db");
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

    async getPagoFinanzas(req, res) {
        try {

            const pago = await Pago.findAll({
                include: [
                    { model: Facturacion },
                    {
                        model: PagoArriendo,
                        include: [
                            { model: PagoAccesorio },
                            {
                                model: Arriendo,
                                include: [
                                    { model: Cliente },
                                    { model: Empresa },
                                    {
                                        model: Remplazo,
                                        include: [
                                            { model: Cliente },
                                            { model: EmpresaRemplazo }
                                        ]
                                    },
                                ]
                            }

                        ]
                    },
                ],
            });

            res.json({
                success: true,
                pago: pago,
            });

        } catch (error) {
            sendError(error, res);
        }
    }

}

module.exports = PagoController;