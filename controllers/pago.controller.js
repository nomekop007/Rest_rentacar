const PagoService = require("../services/pago.service");
const PagoArriendoService = require("../services/pagoArriendo.service");
const { sendError } = require("../helpers/components");
class PagoController {
    constructor() {
        this.servicePago = new PagoService();
        this.servicePagoArriendo = new PagoArriendoService();
    }


    async createPago(req, res) {
        try {
            const response = req.body;
            const pago = await this.servicePago.postCreate(response);
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
            response.arrayPagos.map(async (id_pago) => {
                let data = { id_facturacion: response.id_facturacion, estado_pago: response.estado_pago };
                await this.servicePago.putUpdate(data, id_pago);
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
            const where = { estado_pago: "PENDIENTE" };
            const pago = await this.servicePago.getFindAll(where);
            res.json({
                success: true,
                data: pago
            });
        } catch (error) {
            sendError(error)
        }
    }


    async findPagosRemplazosPendientes(req, res) {
        try {
            const where = { estado_pago: "PENDIENTE", deudor_pago: req.params.id };
            const pago = await this.servicePago.getFindAll(where);
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
                const pago = await this.servicePago.getFindOne(id_pago);
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
                    await this.servicePago.putUpdate(dataPago, id_pago);
                    await this.servicePagoArriendo.putUpdate(dataPagoArriendo, pago.pagosArriendo.id_pagoArriendo);
                    res.json({
                        success: true,
                        msg: "modificado!"
                    });
                    return;
                } else {
                    res.json({
                        success: false,
                        msg: "El descuento es mayor al ultimo pago!"
                    });
                    return;
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