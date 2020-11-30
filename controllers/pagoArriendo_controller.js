const { PagoArriendo, Arriendo, Pago } = require("../database/db");
const { sendError, ordenarArrayporFecha } = require("../helpers/components");

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

    async consultarPagosPendientes(req, res) {
        try {

            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: req.params.id },
                include: {
                    model: PagoArriendo,
                    include: { model: Pago }
                }
            });
            const arrayTotalPagos = arriendo.pagosArriendos;

            let arrayPago = [];
            let totalPago = 0;

            arrayTotalPagos.map((pagosArriendo) => {
                const pagos = ordenarArrayporFecha(pagosArriendo.pagos);
                if (pagos[0].estado_pago == "PENDIENTE") {
                    totalPago += pagos[0].total_pago;
                    arrayPago.push(pagos[0])
                }
            })

            if (arrayPago.length <= 0) {
                res.json({
                    success: true,
                    deuda: false,
                    msg: "sin pagos pendientes"
                });

            } else {
                res.json({
                    success: true,
                    deuda: true,
                    data: {
                        arrayPago: arrayPago,
                        totalPago: totalPago
                    }
                });
            }
        } catch (error) {
            sendError(error, res)
        }
    }


    async getPagosRemplazosPendientes(req, res) {
        try {


            const pago = await Pago.findAll({
                where: { estado_pago: "PENDIENTE" },
            })
            res.json({
                success: true,
                data: pago
            })

        } catch (error) {
            sendError(error)
        }
    }


}

module.exports = PagoArriendoController;