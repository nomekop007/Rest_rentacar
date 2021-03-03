class PagoController {

    constructor({ PagoService, sendError }) {
        this._pagoService = PagoService;
        this.sendError = sendError;
    }


    async registrarPagoExtra(req, res) {
        try {
            const { monto, tipo, descripcion, idArriendo } = req.body;
            const userAt = req.headers["userat"];
            const pagoExtra = await this._pagoService.registrarPagoExtra(monto, tipo, descripcion, idArriendo, userAt);
            res.json({ success: true, data: pagoExtra, msg: "registro existoso" })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async mostrarPagoExtrasPorArriendo(req, res) {
        try {
            const { id } = req.params;
            const pagosExtras = await this._pagoService.mostrarPagoExtrasPorArriendo(id);
            res.json({ success: true, data: pagosExtras })
        } catch (error) {
            this.sendError(error, req, res);
        }
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
            const pago = req.body;
            const pagoRepo = await this._pagoService.createPago(pago);
            res.json({
                success: true,
                pago: pagoRepo,
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
            const total = await this._pagoService.calcularTotalPagos(arrayPagos);
            res.json({ success: true, data: { total_factura: total } });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updatePagos(req, res, next) {
        try {
            const { id_facturacion, estado_pago, arrayPagos } = req.body;
            await this._pagoService.updatePagos(id_facturacion, estado_pago, arrayPagos);
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
            const { id } = req.params;
            const userAt = req.headers["userat"];
            await this._pagoService.updateOnePago(pago, pagoArriendo, id, userAt);
            res.json({ success: true, msg: "pago modificado!" })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async getPagosRemplazos(req, res) {
        try {
            const { sucursal } = req.query;
            const pagosRepo = await this._pagoService.getPagosRemplazos(sucursal);
            res.json({ success: true, data: pagosRepo });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async findPagosRemplazosPendientes(req, res) {
        try {
            const { id } = req.params;
            const pagosRepo = await this._pagoService.findPagosRemplazosPendientes(id);
            res.json({
                success: true,
                data: pagosRepo
            });
        } catch (error) {
            this.sendError(error, req, res);;
        }
    }

    async findPago(req, res) {
        try {
            const { id } = req.params;
            const pagoRepo = await this._pagoService.findPago(id);
            res.json({ success: true, data: pagoRepo })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async aplicarDescuentoPago(req, res, next) {
        try {
            const { dias_restantes, descuento_pago, extra_pago, observacion_pago, arrayPagos } = req.body;
            const response = await this._pagoService.aplicarDescuentoPago(dias_restantes, descuento_pago, extra_pago, observacion_pago, arrayPagos);
            res.json(response);
            if (response.success) {
                next();
            }
        } catch (error) {
            this.sendError(error, req, res);;
        }
    }

    async buscarPagosClientePendiente(req, res) {
        try {
            const { id } = req.params;
            const response = await this._pagoService.buscarPagosClientePendiente(id);
            res.json(response);
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async cargarPagosClientes(req, res) {
        try {
            const { sucursal } = req.query;
            const pagosRepo = await this._pagoService.cargarPagosClientes(sucursal);
            res.json({ success: true, data: pagosRepo })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async actualizarUnPagoPendiente(req, res) {
        try {
            const { id_facturacion, estado_pago } = req.body;
            const { id } = req.params;
            const pagoRepo = await this._pagoService.actualizarUnPagoPendiente(id_facturacion, estado_pago, id);
            res.json({ success: true, msg: "pago actualizado!", data: pagoRepo });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async actualizarMontoPago(req, res) {
        try {
            const { nuevo_monto } = req.body;
            const { id } = req.params;
            await this._pagoService.actualizarMontoPago(nuevo_monto, id);
            res.json({ success: true, msg: "pago actualizado!" });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createPagoDanio(req, res, next) {
        try {
            const pagoDanio = req.body;
            const pagoDanioRepo = await this._pagoService.createPagoDanio(pagoDanio);
            res.json({
                success: true,
                data: { id_pagoDanio: pagoDanioRepo.id_pagoDanio }
            })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createPagoArriendo(req, res, next) {
        try {
            const pagoArriendo = req.body;
            const pagoArriendoRepo = await this._pagoService.createPagoArriendo(pagoArriendo);
            res.json({
                success: true,
                pagoArriendo: pagoArriendoRepo,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async consultarPagosArriendo(req, res) {
        try {
            const { id } = req.params;
            const payload = await this._pagoService.consultarPagosArriendo(id);
            const { arrayPago, arrayPagoExtra, arrayPagoDanio, totalPago, arriendo } = payload;
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

    async consultarTotalPagosArriendo(req, res) {
        try {
            const { id } = req.params;
            const payload = await this._pagoService.consultarTotalPagosArriendo(id);
            const { arrayPago, arrayPagoExtra, arrayPagoDanio, totalPago, arriendo } = payload;
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
            const { id_pagoArriendo, matrizAccesorios } = req.body;
            const userAt = req.headers["userat"];
            await this._pagoService.createPagoAccesorios(id_pagoArriendo, userAt, matrizAccesorios);
            res.json({ success: true, msg: "registro exitoso" });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async getFacturacion(req, res) {
        try {
            const facturacionRepo = await this._pagoService.getFacturacion();
            res.json({ success: true, data: facturacionRepo, })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createFacturacion(req, res, next) {
        try {
            const facturacion = req.body;
            const facturacionRepo = await this._pagoService.createFacturacion(facturacion);
            res.json({ success: true, data: facturacionRepo, msg: "registro exitoso" });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async uploadDocumentFacturacion(req, res, next) {
        try {
            const { filename } = req.file;
            const { id } = req.params;
            await this._pagoService.uploadDocumentFacturacion(filename, id);
            res.json({ success: true, msg: " documento guardada" });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createAbonoWithFacturacion(req, res, next) {
        try {
            const abono = req.body;
            const abonoRepo = await this._pagoService.createAbonoWithFacturacion(abono);
            res.json({ success: true, data: abonoRepo, msg: "abono creado" })
            next();
        } catch (error) {
            this.sendError(error, req, res)
        }
    }



}

module.exports = PagoController;