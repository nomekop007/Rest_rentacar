const ordenarArrayporFecha = require("../../helpers/orderArrayByDate");

class PagoController {

    constructor({ PagoService, AbonoRepository, PagoDanioRepository, FacturacionRepository, PagoAccesorioRepository, PagoRepository, PagoArriendoRepository, ArriendoRepository, sendError }) {
        this._pagoService = PagoService;
        this.sendError = sendError;

        //mover
        this._servicioPagoAccesorio = PagoAccesorioRepository;
        this._servicePago = PagoRepository;
        this._servicePagoDanio = PagoDanioRepository;
        this._servicePagoArriendo = PagoArriendoRepository;
        this._serviceArriendo = ArriendoRepository;
        this._serviceFacturacion = FacturacionRepository;
        this._serviceAbono = AbonoRepository;
    }

    async detelePagoExtra(req, res) {
        try {
            const { id } = req.params;
            await this._pagoService.detelePagoExtra(id);
            res.json({ success: true, msg: "eliminado" });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async actualizarPagosExtras(req, res) {
        try {
            const { id_facturacion, arrayPagosExtra } = req.body;
            await this._pagoService.actualizarPagosExtras(id_facturacion, arrayPagosExtra);
            res.json({ success: true, msg: "modificado!" });
        } catch (error) {
            this.sendError(error, req, res);
        }
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
        }
    }


    async getPagosRemplazos(req, res) {
        try {
            const { sucursal } = req.query;
            let where = {};
            if (sucursal !== "0") where = { id_sucursal: sucursal };
            const pagos = await this._servicePago.getFindAllBySucursal(where);
            res.json({
                success: true,
                data: pagos
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findPagosRemplazosPendientes(req, res) {
        try {
            const where = { estado_pago: "PENDIENTE", deudor_pago: req.params.id };
            const pago = await this._servicePago.getFindAllPendientes(where);
            res.json({
                success: true,
                data: pago
            });
        } catch (error) {
            this.sendError(error, req, res);;
        }
    }

    async findPago(req, res) {
        try {
            const pago = await this._servicePago.getFindOne(req.params.id);
            res.json({ success: true, data: pago })
        } catch (error) {
            this.sendError(error, req, res);
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
                        dias_pagoArriendo: Number(pago.pagosArriendo.dias_pagoArriendo) - Number(response.dias_restantes),
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
            this.sendError(error, req, res);;
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
            this.sendError(error, req, res);
        }
    }




    async cargarPagosClientes(req, res) {
        try {
            const { sucursal } = req.query;
            let where = {};
            if (sucursal !== "0") where = { id_sucursal: sucursal };
            const pagos = await this._servicePago.getFindAllBySucursal(where);
            res.json({ success: true, data: pagos })
        } catch (error) {
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
        }
    }

    async actualizarMontoPago(req, res) {
        try {
            const { nuevo_monto } = req.body;
            const pago = await this._servicePago.getFindOne(req.params.id);
            const dataPago = {
                neto_pago: Math.round(nuevo_monto / 1.19),
                iva_pago: Math.round((nuevo_monto / 1.19) * 0.19),
                total_pago: nuevo_monto
            }
            const dataPagoArriendo = {
                total_pagoArriendo: dataPago.total_pago,
                iva_pagoArriendo: dataPago.iva_pago,
                neto_pagoArriendo: dataPago.neto_pago
            }
            await this._servicePago.putUpdate(dataPago, req.params.id);
            await this._servicePagoArriendo.putUpdate(dataPagoArriendo, pago.id_pagoArriendo);
            res.json({ success: true, msg: "pago actualizado!" });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async registrarPagoExtra(req, res) {
        try {
            const { monto, tipo, descripcion, idArriendo } = req.body;
            const payload = { monto, tipo, descripcion, idArriendo, userAt: req.headers["userat"] };
            const pagoExtra = await this._pagoService.createPagoExtra(payload);

            res.json({ success: true, data: pagoExtra, msg: "registro existoso" })

        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async mostrarPagoExtrasPorArriendo(req, res) {
        try {
            const { id } = req.params;
            const pagosExtras = await this._pagoService.cargarPagosExtrasPorArriendo(id);
            res.json({ success: true, data: pagosExtras })
        } catch (error) {
            this.sendError(error, req, res);

        }
    }

    async createPagoDanio(req, res, next) {
        try {
            const response = req.body;
            const pagoDanio = await this._servicePagoDanio.postCreate(response);
            res.json({
                success: true,
                data: { id_pagoDanio: pagoDanio.id_pagoDanio }
            })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createPagoArriendo(req, res, next) {
        try {
            const response = req.body;
            const arriendo = await this._serviceArriendo.getFindOne(response.id_arriendo);
            response.dias_pagoArriendo = arriendo.diasActuales_arriendo;
            const pagoArriendo = await this._servicePagoArriendo.postCreate(response);
            res.json({
                success: true,
                pagoArriendo: pagoArriendo,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async consultarPagosArriendo(req, res) {
        try {
            let totalPago = 0;
            const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
            let arrayPago = [];
            let arrayTotalPagos = arriendo.pagosArriendos;
            let arrayPagoExtra = arriendo.pagosExtras;
            let arrayPagoDanio = arriendo.danioVehiculos;
            if (arrayPagoDanio.length > 0) {
                arrayPagoDanio.forEach(({ pagosDanio }) => {
                    if (pagosDanio) {
                        totalPago += pagosDanio.precioTotal_pagoDanio;
                    }
                })
            }
            if (arrayPagoExtra.length > 0) { } {
                arrayPagoExtra.forEach(({ monto_pagoExtra }) => {
                    totalPago += monto_pagoExtra;
                })
            }
            arrayTotalPagos.forEach((pagosArriendo) => {
                const pagos = ordenarArrayporFecha(pagosArriendo.pagos);
                totalPago += pagos[0].total_pago;
                arrayPago.push({ pago: pagos[0], pagoArriendo: pagosArriendo })
            })
            res.json({
                success: true,
                deuda: true,
                data: {
                    arrayPago: arrayPago,
                    arrayPagoExtra: arrayPagoExtra,
                    arrayPagoDanio: arrayPagoDanio,
                    totalPago: totalPago,
                    arriendo: arriendo
                }
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async createPagoAccesorios(req, res, next) {
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
                await this._servicioPagoAccesorio.postCreate(data);
            }
            res.json({
                success: true,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async getFacturacion(req, res) {
        try {
            const facturacion = await this._serviceFacturacion.getFindAll();
            res.json({
                success: true,
                data: facturacion,
            })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createFacturacion(req, res, next) {
        try {
            const response = req.body;
            const facturacion = await this._serviceFacturacion.postCreate(response);
            res.json({
                success: true,
                data: facturacion,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async uploadDocumentFacturacion(req, res, next) {
        try {
            const data = { documento_facturacion: req.file.filename };
            await this._serviceFacturacion.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: " documento guardada",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createAbonoWithFacturacion(req, res, next) {
        try {
            const abono = await this._serviceAbono.postCreateWithFacturacion(req.body);
            res.json({ success: true, data: abono, msg: "abono creado" })
            next();
        } catch (error) {
            this.sendError(error, req, res)
        }
    }



}

module.exports = PagoController;