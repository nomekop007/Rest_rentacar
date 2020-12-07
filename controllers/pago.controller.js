const { Pago, PagoArriendo } = require("../database/db");
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



    async updatePagos(req, res) {
        try {

            const response = req.body;
            console.log(response)

            response.arrayPagos.map(async (id_pago) => {
                await Pago.update({ id_facturacion: response.id_facturacion, estado_pago: response.estado_pago }, {
                    where: { id_pago: id_pago },
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

    async getPagosRemplazosPendientes(req, res) {
        try {
            const pago = await Pago.findAll({
                where: { estado_pago: "PENDIENTE" },
                include: { model: PagoArriendo }
            })
            res.json({
                success: true,
                data: pago
            })
        } catch (error) {
            sendError(error)
        }
    }


    async findPagosRemplazosPendientes(req, res) {
        try {
            console.log(req.params.id)
            const pago = await Pago.findAll({
                where: { estado_pago: "PENDIENTE", deudor_pago: req.params.id },
                include: { model: PagoArriendo }
            })

            res.json({
                success: true,
                data: pago
            });
        } catch (error) {
            sendError(error);
        }
    }


    async aplicarDescuentoPago(req, res) {
        try {

            const response = req.body;

            if (Number(response.descuento_pago) != 0) {


                const id_pago = response.arrayPagos[response.arrayPagos.length - 1];
                const pago = await Pago.findOne({ where: { id_pago: id_pago }, include: { model: PagoArriendo } })


                const nuevo_monto = pago.total_pago - Number(response.descuento_pago);
                if (nuevo_monto > 0) {
                    const dataPago = {
                        neto_pago: Math.round(nuevo_monto / 1.19),
                        iva_pago: Math.round((nuevo_monto / 1.19) * 0.19),
                        total_pago: nuevo_monto
                    }
                    const dataPagoArriendo = {
                        observaciones_pagoArriendo: `${pago.pagosArriendo.observaciones_pagoArriendo}. ${response.observacion_pago}`
                    }


                    await Pago.update(dataPago, { where: { id_pago: id_pago } });
                    await PagoArriendo.update(dataPagoArriendo, { where: { id_pagoArriendo: pago.pagosArriendo.id_pagoArriendo } })


                    res.json({
                        success: true,
                        msg: "modificado!"
                    });
                    return
                } else {
                    res.json({
                        success: false,
                        msg: "El descuento es mayor al ultimo pago!"
                    });
                    return
                }
            } else {
                res.json({
                    success: true,
                    msg: "sin descuento"
                });
            }
        } catch (error) {
            sendError(error);
        }
    }
}

module.exports = PagoController;