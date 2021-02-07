const PagoService = require("../services/pago.service");
const PagoArriendoService = require("../services/pagoArriendo.service");
const ArriendoService = require("../services/arriendo.service");
const { sendError } = require("../helpers/components");
class PagoController {
    constructor() {
        this._servicePago = new PagoService();
        this._servicePagoArriendo = new PagoArriendoService();
        this._serviceArriendo = new ArriendoService();
    }


    async createPago(req, res, next) {
        try {
            const response = req.body;
            const pago = await this._servicePago.postCreate(response);
            res.json({
                success: true,
                pago: pago,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async calcularTotalPagos(req, res) {
        try {
            const { arrayPagos } = req.body;
            let total = 0;
            let where = [];
            arrayPagos.forEach(id => { where.push({ id_pago: id }) })
            const pagos = await this._servicePago.getFindAllById(where);
            pagos.forEach(({ total_pago }) => { total = total + Number(total_pago) })
            res.json({ success: true, data: { total_factura: total } });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updatePagos(req, res, next) {
        try {
            const response = req.body;
            response.arrayPagos.map(async (id_pago) => {
                let data = { id_facturacion: response.id_facturacion, estado_pago: response.estado_pago };
                await this._servicePago.putUpdate(data, id_pago);
            });
            res.json({
                success: true,
                msg: "Pago actualizado",
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updateOnePago(req, res, next) {
        try {
            const { pago, pagoArriendo } = req.body;
            const p = await this._servicePago.getFindOne(req.params.id);
            pago.userAt = req.headers["userat"];
            pagoArriendo.userAt = req.headers["userat"];
            pagoArriendo.observaciones_pagoArriendo = `${p.pagosArriendo.observaciones_pagoArriendo}.
            ${pagoArriendo.observaciones_pagoArriendo}`;
            await this._servicePago.putUpdate(pago, req.params.id);
            await this._servicePagoArriendo.putUpdate(pagoArriendo, pagoArriendo.id_pagoArriendo);
            res.json({ success: true, msg: "pago modificado!" })
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async getPagosRemplazosPendientes(req, res) {
        try {
            const where = { estado_pago: "PENDIENTE" };
            const pago = await this._servicePago.getFindAll(where);
            res.json({
                success: true,
                data: pago
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async findPagosRemplazosPendientes(req, res) {
        try {
            const where = { estado_pago: "PENDIENTE", deudor_pago: req.params.id };
            const pago = await this._servicePago.getFindAll(where);
            res.json({
                success: true,
                data: pago
            });
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async findPago(req, res) {
        try {
            const pago = await this._servicePago.getFindOne(req.params.id);
            res.json({ success: true, data: pago })
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async aplicarDescuentoPago(req, res, next) {
        try {
            const response = req.body;
            if (Number(response.descuento_pago) != 0 || Number(response.extra_pago) != 0) {
                const id_pago = response.arrayPagos[response.arrayPagos.length - 1];
                const pago = await this._servicePago.getFindOne(id_pago);
                const nuevo_monto = pago.total_pago - Number(response.descuento_pago) + Number(response.extra_pago);
                if (nuevo_monto > 0) {
                    const dataPago = {
                        neto_pago: Math.round(nuevo_monto / 1.19),
                        iva_pago: Math.round((nuevo_monto / 1.19) * 0.19),
                        total_pago: nuevo_monto
                    }
                    const dataPagoArriendo = {
                        observaciones_pagoArriendo: `${pago.pagosArriendo.observaciones_pagoArriendo}.
                         ${response.observacion_pago}`,
                        total_pagoArriendo: dataPago.total_pago,
                        iva_pagoArriendo: dataPago.iva_pago,
                        neto_pagoArriendo: dataPago.neto_pago
                    }
                    await this._servicePago.putUpdate(dataPago, id_pago);
                    await this._servicePagoArriendo.putUpdate(dataPagoArriendo, pago.pagosArriendo.id_pagoArriendo);
                    res.json({
                        success: true,
                        msg: "modificado!"
                    });
                    next();
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
            sendError(error, req, res);;
        }
    }


    async buscarPagosClientePendiente(req, res) {
        try {
            const id_arriendo = req.params.id;
            const arriendo = await this._serviceArriendo.getFindOneMin(id_arriendo);

            if (!arriendo) {
                res.json({ success: false, msg: "arriendo no encontrado" })
                return;
            }

            let rut_cliente = '';
            let nombre_cliente = ''
            switch (arriendo.tipo_arriendo) {
                case "PARTICULAR":
                    rut_cliente = arriendo.rut_cliente;
                    nombre_cliente = arriendo.cliente.nombre_cliente;
                    break;
                case "REEMPLAZO":
                    rut_cliente = arriendo.remplazo.cliente.rut_cliente;
                    nombre_cliente = arriendo.remplazo.cliente.nombre_cliente;
                    break;
                case "EMPRESA":
                    rut_cliente = arriendo.empresa.rut_empresa;
                    nombre_cliente = arriendo.empresa.nombre_empresa;
                    break;
            }
            const pagos = await this._servicePago.getFindAllByArriendo(id_arriendo);
            let arrayPagos = [];
            pagos.map((pago) => {
                if (pago.deudor_pago === rut_cliente && pago.estado_pago === "PENDIENTE") {
                    arrayPagos.push(pago);
                }
            })
            res.json({ success: true, data: { pagos: arrayPagos, arriendo: arriendo, cliente: nombre_cliente } })
        } catch (error) {
            sendError(error, req, res);
        }
    }




    async cargarPagosClientes(req, res) {
        try {
            const where = {};
            const pagos = await this._servicePago.getFindAll(where);
            res.json({ success: true, data: pagos })
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async actualizarUnPagoPendiente(req, res) {
        try {
            const { id_facturacion, estado_pago } = req.body;
            const data = {
                id_facturacion: id_facturacion,
                estado_pago: estado_pago
            }
            const pago = await this._servicePago.putUpdate(data, req.params.id);
            res.json({ success: true, msg: "pago actualizado!", data: pago });
        } catch (error) {
            sendError(error, req, res);
        }
    }



}

module.exports = PagoController;