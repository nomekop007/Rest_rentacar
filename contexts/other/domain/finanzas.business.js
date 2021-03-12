const path = require("path");
const formatFechahora = require("../../../helpers/dateTimeFormat");

class FinanzasBusiness {

    constructor({ ArriendoRepository, ConductorRepository }) {
        this._arriendoRepository = ArriendoRepository;
        this._conductorRepository = ConductorRepository;
    }

    async getArriendoFinanzas() {
        const arriendos = await this._arriendoRepository.getFindAll();
        return arriendos;
    }



    async findArriendoFinanza(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        return arriendo;
    }


    async findDocumentosArriendoFinanzas(documento, tipo) {
        let paths = '';
        switch (tipo) {
            case "contrato":
                paths = path.join(__dirname, `../${process.env.PATH_CONTRATO}/${documento}`);
                break;
            case "acta":
                paths = path.join(__dirname, `../${process.env.PATH_ACTA_ENTREGA}/${documento}`);
                break;
            case "requisito":
                paths = path.join(__dirname, `../${process.env.PATH_REQUISITO_ARRIENDO}/${documento}`);
                break;
            case "facturacion":
                paths = path.join(__dirname, `../${process.env.PATH_FACTURACIONES}/${documento}`);
                break;
            case "recepcion":
                paths = path.join(__dirname, `../${process.env.PATH_RECEPCIONES}/${documento}`);
                break;
            case "fotosDañoVehiculo":
                paths = path.join(__dirname, `../${process.env.PATH_DANIO_VEHICULO}/${documento}`);
                break;
            case "fotoVehiculo":
                paths = path.join(__dirname, `../${process.env.PATH_FOTO_VEHICULO}/${documento}`);
                break;
            default:
                return {
                    success: false,
                    msg: "tipo no encontrado"
                }
        }
        return {
            success: true,
            data: {
                nombre: documento,
                tipo: tipo,
                paths: paths
            },
        }
    }






    async getArriendoFinanzasV2() {
        const arriendosRepo = await this._arriendoRepository.getFindAll();



        const arriendos = arriendosRepo.map((arriendoRepo) => {
            //urls de los docs


            let infoArriendo = {
                contratos: []
            };
            let infoCliente = {};
            let infoVehiculo = {};
            let infoConductores = [];
            let infoPagos = {
                ingresoTotal: 0,
                diasTotales: 0,
                arrayPagosCliente: {
                    montoTotal: 0,
                    comprobantes: [],
                    pagos: []
                },
                arrayPagosReemplazo: {
                    montoTotal: 0,
                    comprobantes: [],
                    pagos: []
                },
                arrayPagosDanio: {
                    montoTotal: 0,
                    comprobantes: [],
                    pagos: []
                },
                arrayPagosExtras: {
                    montoTotal: 0,
                    comprobantes: [],
                    pagos: []
                }
            };


            try {
                infoArriendo.numeroArriendo = arriendoRepo.id_arriendo;
                infoArriendo.estado = arriendoRepo.estado_arriendo;
                infoArriendo.tipo = arriendoRepo.tipo_arriendo;
                infoArriendo.fechaDespacho = formatFechahora(arriendoRepo.fechaEntrega_arriendo);
                infoArriendo.fechaRecepcion = formatFechahora(arriendoRepo.fechaRecepcion_arriendo);
                infoArriendo.sucursalResponsable = arriendoRepo.sucursale.nombre_sucursal;
                infoArriendo.diasTotales = arriendoRepo.diasAcumulados_arriendo;

                let i = 1;
                if (arriendoRepo.contratos.length > 0) {
                    arriendoRepo.contratos.forEach(contrato => {
                        infoArriendo.contratos.push({
                            numero: i++,
                            fecha: formatFechahora(contrato.createdAt),
                            url: `${process.env.PATH_SERVER}/${contrato.documento}`,
                        });
                    })
                }


                switch (arriendoRepo.tipo_arriendo) {
                    case "PARTICULAR":
                        infoCliente.nombre = arriendoRepo.cliente.nombre_cliente;
                        infoCliente.rut = arriendoRepo.cliente.rut_cliente;
                        break;
                    case "REEMPLAZO":
                        infoCliente.nombre = arriendoRepo.remplazo.cliente.nombre_cliente;
                        infoCliente.rut = arriendoRepo.remplazo.cliente.rut_cliente;
                        break;
                    case "EMPRESA":
                        infoCliente.nombre = arriendoRepo.empresa.nombre_empresa
                        infoCliente.rut = arriendoRepo.empresa.rut_empresa;
                        break;
                }

                infoVehiculo.patente = arriendoRepo.vehiculo.patente_vehiculo;
                infoVehiculo.marca = arriendoRepo.vehiculo.marca_vehiculo;
                infoVehiculo.modelo = arriendoRepo.vehiculo.modelo_vehiculo;
                infoVehiculo['año'] = arriendoRepo.vehiculo['año_vehiculo'];
                infoVehiculo.kilomentrosEnDespacho = arriendoRepo.kilometrosEntrada_arriendo;
                infoVehiculo.kilomentrosEnRecepcion = arriendoRepo.kilometrosSalida_arriendo;
                infoConductores.push({
                    rut: arriendoRepo.conductore.rut_conductor,
                })
                if (arriendoRepo.rut_conductor2) {
                    infoConductores.push({
                        rut: arriendoRepo.rut_conductor2,
                    })
                }
                if (arriendoRepo.rut_conductor3) {
                    infoConductores.push({
                        rut: arriendoRepo.rut_conductor3,
                    })
                }


                if (arriendoRepo.pagosArriendos) {

                    if (arriendoRepo.tipo_arriendo === "REEMPLAZO") {

                        arriendoRepo.pagosArriendos.forEach((pagoArriendo) => {
                            infoPagos.diasTotales += pagoArriendo.dias_pagoArriendo;
                            if (pagoArriendo.pagos[0]) {
                                const pagoCliente = {
                                    dias: pagoArriendo.dias_pagoArriendo,
                                    monto: pagoArriendo.pagos[0].total_pago,
                                    deudor: pagoArriendo.pagos[0].deudor_pago,
                                    estado: pagoArriendo.pagos[0].estado_pago,
                                    updatedAt: formatFechahora(pagoArriendo.pagos[0].updatedAt),
                                }
                                infoPagos.arrayPagosCliente.montoTotal += pagoCliente.monto;
                                infoPagos.arrayPagosCliente.pagos.push(pagoCliente);
                            }
                            if (pagoArriendo.pagos[1]) {
                                const pagoReemplazo = {
                                    dias: pagoArriendo.dias_pagoArriendo,
                                    monto: pagoArriendo.pagos[1].total_pago,
                                    deudor: pagoArriendo.pagos[1].deudor_pago,
                                    descripcion: pagoArriendo.observaciones_pagoArriendo,
                                    estado: pagoArriendo.pagos[1].estado_pago,
                                    updatedAt: formatFechahora(pagoArriendo.pagos[1].updatedAt),
                                }
                                infoPagos.arrayPagosReemplazo.montoTotal += pagoReemplazo.monto;
                                infoPagos.arrayPagosReemplazo.pagos.push(pagoReemplazo);
                            }
                        })


                        if (arriendoRepo.pagosArriendos[0]) {
                            if (arriendoRepo.pagosArriendos[0].pagos[0].facturacione) {
                                infoPagos.arrayPagosCliente.comprobantes.push({
                                    abono: infoPagos.arrayPagosCliente.montoTotal,
                                    tipo: arriendoRepo.pagosArriendos[0].pagos[0].facturacione.tipo_facturacion,
                                    folio: arriendoRepo.pagosArriendos[0].pagos[0].facturacione.numero_facturacion,
                                    metodoPago: arriendoRepo.pagosArriendos[0].pagos[0].facturacione.modosPago.nombre_modoPago,
                                    url: `${process.env.PATH_SERVER}/${arriendoRepo.pagosArriendos[0].pagos[0].facturacione.documento_facturacion}`,
                                })
                            }
                            if (arriendoRepo.pagosArriendos[0].pagos[1]) {
                                if (arriendoRepo.pagosArriendos[0].pagos[1].facturacione) {
                                    infoPagos.arrayPagosReemplazo.comprobantes.push({
                                        abono: infoPagos.arrayPagosReemplazo.montoTotal,
                                        tipo: arriendoRepo.pagosArriendos[0].pagos[1].facturacione.tipo_facturacion,
                                        folio: arriendoRepo.pagosArriendos[0].pagos[1].facturacione.numero_facturacion,
                                        metodoPago: arriendoRepo.pagosArriendos[0].pagos[1].facturacione.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${arriendoRepo.pagosArriendos[0].pagos[1].facturacione.documento_facturacion}`,
                                    })
                                }
                            }

                            if (arriendoRepo.pagosArriendos[0].pagos[0].abonos.length > 0) {
                                arriendoRepo.pagosArriendos[0].pagos[0].abonos.forEach((abono) => {
                                    infoPagos.arrayPagosCliente.comprobantes.push({
                                        abono: abono.pago_abono,
                                        tipo: abono.facturacione.tipo_facturacion,
                                        folio: abono.facturacione.numero_facturacion,
                                        metodoPago: abono.facturacione.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${abono.facturacione.documento_facturacion}`,
                                    })
                                })
                            }
                        }


                        if (arriendoRepo.danioVehiculos.length > 0) {
                            if (arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio) {
                                const pagoDanio = arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio;
                                const danio = {
                                    monto: pagoDanio.precioTotal_pagoDanio,
                                    detalle: arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].descripcion_danioVehiculo,
                                    updatedAt: formatFechahora(pagoDanio.updatedAt),
                                }
                                infoPagos.arrayPagosDanio.montoTotal += danio.monto;
                                infoPagos.arrayPagosDanio.pagos.push(danio);
                                if (arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione) {
                                    const factura = arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione;
                                    infoPagos.arrayPagosDanio.comprobantes.push({
                                        abono: infoPagos.arrayPagosDanio.montoTotal,
                                        tipo: factura.tipo_facturacion,
                                        folio: factura.numero_facturacion,
                                        metodoPago: factura.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${factura.documento_facturacion}`,
                                    })
                                }
                            }
                        }


                        infoPagos.ingresoTotal = infoPagos.arrayPagosCliente.montoTotal + infoPagos.arrayPagosReemplazo.montoTotal + infoPagos.arrayPagosDanio.montoTotal;

                    } else {

                        // EMPRESA Y PARTICULARES
                        arriendoRepo.pagosArriendos.forEach((pagoArriendo) => {
                            if (pagoArriendo.pagos[0]) {
                                infoPagos.diasTotales += pagoArriendo.dias_pagoArriendo;
                                const pagoCliente = {
                                    dias: pagoArriendo.dias_pagoArriendo,
                                    monto: pagoArriendo.pagos[0].total_pago,
                                    deudor: pagoArriendo.pagos[0].deudor_pago,
                                    estado: pagoArriendo.pagos[0].estado_pago,
                                    updatedAt: formatFechahora(pagoArriendo.pagos[0].updatedAt),
                                }
                                infoPagos.arrayPagosCliente.montoTotal += pagoCliente.monto;
                                infoPagos.arrayPagosCliente.pagos.push(pagoCliente);
                                if (pagoArriendo.pagos[0].facturacione) {
                                    infoPagos.arrayPagosCliente.comprobantes.push({
                                        abono: pagoArriendo.pagos[0].total_pago,
                                        tipo: pagoArriendo.pagos[0].facturacione.tipo_facturacion,
                                        folio: pagoArriendo.pagos[0].facturacione.numero_facturacion,
                                        metodoPago: pagoArriendo.pagos[0].facturacione.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${pagoArriendo.pagos[0].facturacione.documento_facturacion}`,
                                    })
                                }
                                if (pagoArriendo.pagos[0].abonos.length > 0) {
                                    pagoArriendo.pagos[0].abonos.forEach((abono) => {
                                        infoPagos.arrayPagosCliente.comprobantes.push({
                                            abono: abono.pago_abono,
                                            tipo: abono.facturacione.tipo_facturacion,
                                            folio: abono.facturacione.numero_facturacion,
                                            metodoPago: abono.facturacione.modosPago.nombre_modoPago,
                                            url: `${process.env.PATH_SERVER}/${abono.facturacione.documento_facturacion}`,
                                        })
                                    })
                                }
                            }
                        })

                        if (arriendoRepo.pagosExtras.length > 0) {
                            let estado = "PENDIENTE";
                            if (arriendoRepo.pagosExtras[0].facturacione) {
                                estado = "PAGADO";
                            }
                            arriendoRepo.pagosExtras.forEach((pagoExtra) => {
                                const extra = {
                                    monto: pagoExtra.monto_pagoExtra,
                                    detalle: pagoExtra.detalle_pagoExtra,
                                    estado: estado,
                                    updatedAt: formatFechahora(pagoExtra.updatedAt),
                                }
                                infoPagos.arrayPagosExtras.montoTotal += extra.monto;
                                infoPagos.arrayPagosExtras.pagos.push(extra);
                            });
                            if (arriendoRepo.pagosExtras[0].facturacione) {
                                infoPagos.arrayPagosExtras.comprobantes.push({
                                    abono: infoPagos.arrayPagosExtras.montoTotal,
                                    tipo: arriendoRepo.pagosExtras[0].facturacione.tipo_facturacion,
                                    folio: arriendoRepo.pagosExtras[0].facturacione.numero_facturacion,
                                    metodoPago: arriendoRepo.pagosExtras[0].facturacione.modosPago.nombre_modoPago,
                                    url: `${process.env.PATH_SERVER}/${arriendoRepo.pagosExtras[0].facturacione.documento_facturacion}`,
                                })
                            }
                        }


                        if (arriendoRepo.danioVehiculos.length > 0) {
                            if (arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio) {
                                const pagoDanio = arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio;
                                const danio = {
                                    monto: pagoDanio.precioTotal_pagoDanio,
                                    detalle: arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].descripcion_danioVehiculo,
                                    estado: arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].estado_danioVehiculo,
                                    updatedAt: formatFechahora(pagoDanio.updatedAt),
                                }
                                infoPagos.arrayPagosDanio.montoTotal += danio.monto;
                                infoPagos.arrayPagosDanio.pagos.push(danio);
                                if (arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione) {
                                    const factura = arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione;
                                    infoPagos.arrayPagosDanio.comprobantes.push({
                                        abono: infoPagos.arrayPagosDanio.montoTotal,
                                        tipo: factura.tipo_facturacion,
                                        folio: factura.numero_facturacion,
                                        metodoPago: factura.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${factura.documento_facturacion}`,
                                    })
                                }
                            }
                        }

                        infoPagos.ingresoTotal = infoPagos.arrayPagosCliente.montoTotal + infoPagos.arrayPagosExtras.montoTotal + infoPagos.arrayPagosDanio.montoTotal;
                    }

                }

                return {
                    infoArriendo: infoArriendo,
                    infoCliente: infoCliente,
                    infoVehiculo: infoVehiculo,
                    infoConductores: infoConductores,
                    infoPagos: infoPagos
                }
            } catch (error) {
                console.log(error);
            }
        }).filter((a) => (a.infoArriendo.estado != "ANULADO"))



        return arriendos;
    }




}

module.exports = FinanzasBusiness;