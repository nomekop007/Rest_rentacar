const ordenarArrayporFecha = require("../../../helpers/orderArrayByDate");

class PagoBusiness {

    constructor({ AbonoRepository, PagoDanioRepository, FacturacionRepository, PagoAccesorioRepository, PagoRepository, PagoArriendoRepository, ArriendoRepository, PagoExtraRepository }) {
        this._pagoExtraRepository = PagoExtraRepository;
        this._pagoAccesorioRepository = PagoAccesorioRepository;
        this._pagoRepository = PagoRepository;
        this._pagoDanioRepository = PagoDanioRepository;
        this._pagoArriendoRepository = PagoArriendoRepository;
        this._arriendoRepository = ArriendoRepository;
        this._facturacionRepository = FacturacionRepository;
        this._abonoRepository = AbonoRepository;
    }


    async registrarPagoExtra(monto, descripcion, idArriendo, userAt) {
        const dataPagoExtra = {
            monto_pagoExtra: monto,
            detalle_pagoExtra: descripcion,
            id_arriendo: idArriendo,
            userAt: userAt
        }
        const pagoExtra = await this._pagoExtraRepository.postCreate(dataPagoExtra);
        return pagoExtra;
    }


    async mostrarPagoExtrasPorArriendo(id_arriendo) {
        const pagosExtras = await this._pagoExtraRepository.findAllByIdArriendo(id_arriendo);
        return pagosExtras;
    }


    async detelePagoExtra(id_pagoExtra) {
        await this._pagoExtraRepository.deleteById(id_pagoExtra);
        return true;
    }


    async actualizarPagosExtras(id_facturacion, arrayPagosExtra) {
        arrayPagosExtra.forEach(async (id_pagoExtra) => {
            let data = { id_facturacion: id_facturacion };
            await this._pagoExtraRepository.putUpdateByID(data, id_pagoExtra);
        })
        return true;
    }


    async createPago(pago) {
        const pagoRepo = await this._pagoRepository.postCreate(pago);
        return pagoRepo;
    }


    async calcularTotalPagos(arrayPagos) {
        let total = 0;
        let where = [];
        arrayPagos.forEach(id => { where.push({ id_pago: id }) })
        const pagos = await this._pagoRepository.getFindAllById(where);
        pagos.forEach(({ total_pago }) => { total = total + Number(total_pago) })
        return total;
    }


    async updatePagos(id_facturacion, estado_pago, arrayPagos) {
        arrayPagos.map(async (id_pago) => {
            let data = { id_facturacion: id_facturacion, estado_pago: estado_pago };
            await this._pagoRepository.putUpdate(data, id_pago);
        });
        return true;
    }


    async updateOnePago(pago, pagoArriendo, id_pago, userAt) {
        const p = await this._pagoRepository.getFindOne(id_pago);
        pago.userAt = userAt;
        pagoArriendo.userAt = userAt;
        pagoArriendo.observaciones_pagoArriendo = `${p.pagosArriendo.observaciones_pagoArriendo}.
        ${pagoArriendo.observaciones_pagoArriendo}`;
        await this._pagoRepository.putUpdate(pago, id_pago);
        await this._pagoArriendoRepository.putUpdate(pagoArriendo, pagoArriendo.id_pagoArriendo);
        return true;
    }


    async getPagosRemplazos(id_sucursal) {
        let where = {};
        if (id_sucursal !== "0") where = { id_sucursal: id_sucursal };
        const pagosRepo = await this._pagoRepository.getFindAllBySucursal(where);
        return pagosRepo;
    }


    async findPagosRemplazosPendientes(id_empresaRempalzo) {
        const where = { estado_pago: "PENDIENTE", deudor_pago: id_empresaRempalzo };
        const pagoRepo = await this._pagoRepository.getFindAllPendientes(where);
        return pagoRepo;
    }


    async findPago(id_pago) {
        const pagoRepo = await this._pagoRepository.getFindOne(id_pago);
        return pagoRepo;
    }


    async aplicarDescuentoPago(dias_restantes, descuento_pago, extra_pago, observacion_pago, arrayPagos) {
        if (Number(descuento_pago) != 0 || Number(extra_pago) != 0) {
            const id_pago = arrayPagos[arrayPagos.length - 1];
            const pago = await this._pagoRepository.getFindOne(id_pago);
            const nuevo_monto = pago.total_pago - Number(descuento_pago) + Number(extra_pago);
            if (nuevo_monto > 0) {
                const dataPago = {
                    neto_pago: Math.round(nuevo_monto / 1.19),
                    iva_pago: Math.round((nuevo_monto / 1.19) * 0.19),
                    total_pago: nuevo_monto
                }
                const dataPagoArriendo = {
                    observaciones_pagoArriendo: `${pago.pagosArriendo.observaciones_pagoArriendo}.
                     ${observacion_pago}`,
                    dias_pagoArriendo: Number(pago.pagosArriendo.dias_pagoArriendo) - Number(dias_restantes),
                    total_pagoArriendo: dataPago.total_pago,
                    iva_pagoArriendo: dataPago.iva_pago,
                    neto_pagoArriendo: dataPago.neto_pago
                }
                await this._pagoRepository.putUpdate(dataPago, id_pago);
                await this._pagoArriendoRepository.putUpdate(dataPagoArriendo, pago.pagosArriendo.id_pagoArriendo);
                return {
                    success: true,
                    msg: "modificado!"
                }
            } else {
                return {
                    success: false,
                    msg: "El descuento es mayor al ultimo pago!"
                }
            }
        } else {
            return {
                success: true,
                msg: "sin descuento"
            }
        }
    }


    async buscarPagosClientePendiente(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOneMin(id_arriendo);
        if (!arriendo) {
            return { success: false, msg: "arriendo no encontrado" }
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
        const pagos = await this._pagoRepository.getFindAllByArriendo(id_arriendo);
        let arrayPagos = [];
        pagos.map((pago) => {
            if (pago.deudor_pago === rut_cliente && pago.estado_pago === "PENDIENTE") {
                arrayPagos.push(pago);
            }
        })
        return { success: true, data: { pagos: arrayPagos, arriendo: arriendo, cliente: nombre_cliente } }
    }


    async cargarPagosClientes(id_sucursal) {
        let where = {};
        if (id_sucursal !== "0") where = { id_sucursal: id_sucursal };
        const pagosRepo = await this._pagoRepository.getFindAllBySucursal(where);
        return pagosRepo;
    }


    async actualizarUnPagoPendiente(id_facturacion, estado_pago, id_pago) {
        const data = {
            id_facturacion: id_facturacion,
            estado_pago: estado_pago
        }
        const pagoRepo = await this._pagoRepository.putUpdate(data, id_pago);
        return pagoRepo;
    }


    async actualizarMontoPago(nuevo_monto, id_pago) {
        const pago = await this._pagoRepository.getFindOne(id_pago);
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
        await this._pagoRepository.putUpdate(dataPago, id_pago);
        await this._pagoArriendoRepository.putUpdate(dataPagoArriendo, pago.id_pagoArriendo);
        return true;
    }


    async createPagoDanio(pagoDanio) {
        const pagoDanioRepo = await this._pagoDanioRepository.postCreate(pagoDanio);
        return pagoDanioRepo;
    }


    async createPagoArriendo(pagoArriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(pagoArriendo.id_arriendo);
        pagoArriendo.dias_pagoArriendo = arriendo.diasActuales_arriendo;
        const pagoArriendoRepo = await this._pagoArriendoRepository.postCreate(pagoArriendo);
        return pagoArriendoRepo;
    }


    async consultarPagosArriendo(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        let totalPago = 0;
        let arrayPago = [];
        let arrayTotalPagos = arriendo.pagosArriendos;
        let arrayPagoExtra = arriendo.pagosExtras;
        let arrayPagoDanio = arriendo.danioVehiculos;
        arrayTotalPagos.forEach((pagosArriendo) => {
            const pagos = ordenarArrayporFecha(pagosArriendo.pagos);
            totalPago += pagos[0].total_pago;
            arrayPago.push({ pago: pagos[0], pagoArriendo: pagosArriendo })
        })
        return { arrayPago, arrayPagoExtra, arrayPagoDanio, totalPago, arriendo };
    }

    async consultarTotalPagosArriendo(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        let totalPago = 0;
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
        return { arrayPago, arrayPagoExtra, arrayPagoDanio, totalPago, arriendo };
    }


    async createPagoAccesorios(id_pagoArriendo, userAt, matrizAccesorios) {
        for (let i = 0; i < matrizAccesorios[0].length; i++) {
            const id_accesorio = matrizAccesorios[0][i];
            const precioVenta = matrizAccesorios[1][i];
            const data = {
                precioVenta_pagoAccesorio: Number(precioVenta),
                id_accesorio: id_accesorio,
                id_pagoArriendo: id_pagoArriendo,
                userAt: userAt,
            };
            await this._pagoAccesorioRepository.postCreate(data);
        }
        return true;
    }


    async getFacturacion() {
        const facturacionRepo = await this._facturacionRepository.getFindAll();
        return facturacionRepo;
    }


    async createFacturacion(facturacion) {
        const facturacionRepo = await this._facturacionRepository.postCreate(facturacion);
        return facturacionRepo;
    }


    async uploadDocumentFacturacion(documento_facturacion, id_facturacion) {
        const data = { documento_facturacion: documento_facturacion };
        await this._facturacionRepository.putUpdate(data, id_facturacion);
        return true;
    }

    async createAbonoWithFacturacion(payloand) {
        const abonoRepo = await this._abonoRepository.postCreateWithFacturacion(payloand);
        return abonoRepo;
    }


}

module.exports = PagoBusiness;