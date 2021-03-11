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

            let infoArriendo = {};
            let infoCliente = {};
            let infoVehiculo = {};
            let infoConductores = [];
            let infoPagos = {
                ingresoTotal: 0,
                diasTotales: 0
            };


            try {
                infoArriendo.folio = arriendoRepo.id_arriendo;
                infoArriendo.estado = arriendoRepo.estado_arriendo;
                infoArriendo.tipo = arriendoRepo.tipo_arriendo;
                infoArriendo.fechaDespacho = formatFechahora(arriendoRepo.fechaEntrega_arriendo);
                infoArriendo.fechaRecepcion = formatFechahora(arriendoRepo.fechaRecepcion_arriendo);
                infoArriendo.sucursalResponsable = arriendoRepo.sucursale.nombre_sucursal;
                infoArriendo.diasTotales = arriendoRepo.diasAcumulados_arriendo;

                switch (arriendoRepo.tipo_arriendo) {
                    case "PARTICULAR":
                        infoCliente.nombre = arriendoRepo.cliente.nombre_cliente;
                        infoCliente.rut = arriendoRepo.cliente.rut_cliente;
                        // infoCliente.telefono = `+569 ${arriendoRepo.cliente.telefono_cliente}`;
                        break;
                    case "REEMPLAZO":
                        infoCliente.nombre = arriendoRepo.remplazo.cliente.nombre_cliente;
                        infoCliente.rut = arriendoRepo.remplazo.cliente.rut_cliente;
                        // infoCliente.telefono = `+569 ${arriendoRepo.remplazo.cliente.telefono_cliente}`;
                        break;
                    case "EMPRESA":
                        infoCliente.nombre = arriendoRepo.empresa.nombre_empresa
                        infoCliente.rut = arriendoRepo.empresa.rut_empresa;
                        // infoCliente.telefono = `+569 ${arriendoRepo.empresa.telefono_empresa}`;
                        break;
                }

                infoVehiculo.patente = arriendoRepo.vehiculo.patente_vehiculo;
                infoVehiculo.marca = arriendoRepo.vehiculo.marca_vehiculo;
                infoVehiculo.modelo = arriendoRepo.vehiculo.modelo_vehiculo;
                infoVehiculo['año'] = arriendoRepo.vehiculo['año_vehiculo'];
                infoVehiculo.kilomentrosEnDespacho = arriendoRepo.kilometrosEntrada_arriendo;
                infoVehiculo.kilomentrosEnRecepcion = arriendoRepo.kilometrosSalida_arriendo;

                infoConductores.push({
                    nombre: arriendoRepo.conductore.nombre_conductor,
                    rut: arriendoRepo.conductore.rut_conductor,
                })
                /*       if (arriendoRepo.rut_conductor2) {
                          const conductor2 = await this._conductorRepository.getFindByPK(arriendoRepo.rut_conductor2);
                          if (conductor2) {
                              infoConductores.push({
                                  nombre: conductor2.nombre_conductor,
                                  rut: conductor2.rut_conductor,
                              })
                          }
                      }
                      if (arriendoRepo.rut_conductor3) {
                          const conductor3 = await this._conductorRepository.getFindByPK(arriendoRepo.rut_conductor3);
                          if (conductor3) {
                              infoConductores.push({
                                  nombre: conductor3.nombre_conductor,
                                  rut: conductor3.rut_conductor,
                              })
                          }
                      } */



                if (arriendoRepo.pagosArriendos) {



                    if (arriendoRepo.tipo_arriendo === "REEMPLAZO") {


                        const arrayPagosReemplazo = {
                            montoTotal: 0,
                            comprobantes: [],
                            pagos: []
                        };

                        const arrayPagosCliente = {
                            montoTotal: 0,
                            comprobantes: [],
                            pagos: []
                        };

                        const arrayPagosDanio = {
                            montoTotal: 0,
                            comprobantes: [],
                            pagos: []
                        };


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
                                arrayPagosCliente.montoTotal += pagoCliente.monto;
                                arrayPagosCliente.pagos.push(pagoCliente);
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
                                arrayPagosReemplazo.montoTotal += pagoReemplazo.monto;
                                arrayPagosReemplazo.pagos.push(pagoReemplazo);
                            }
                        })


                        if (arriendoRepo.pagosArriendos[0]) {
                            if (arriendoRepo.pagosArriendos[0].pagos[0].facturacione) {
                                arrayPagosCliente.comprobantes.push({
                                    abono: arrayPagosCliente.montoTotal,
                                    tipo: arriendoRepo.pagosArriendos[0].pagos[0].facturacione.tipo_facturacion,
                                    folio: arriendoRepo.pagosArriendos[0].pagos[0].facturacione.numero_facturacion,
                                    metodoPago: arriendoRepo.pagosArriendos[0].pagos[0].facturacione.modosPago.nombre_modoPago,
                                    url: `${process.env.PATH_SERVER}/${arriendoRepo.pagosArriendos[0].pagos[0].facturacione.documento_facturacion}`,
                                })
                            }
                            if (arriendoRepo.pagosArriendos[0].pagos[0].abonos.length > 0) {
                                arriendoRepo.pagosArriendos[0].pagos[0].abonos.forEach((abono) => {
                                    arrayPagosCliente.comprobantes.push({
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
                                arrayPagosDanio.montoTotal += danio.monto;
                                arrayPagosDanio.pagos.push(danio);
                                if (arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione) {
                                    const factura = arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione;
                                    arrayPagosDanio.comprobantes.push({
                                        abono: arrayPagosDanio.montoTotal,
                                        tipo: factura.tipo_facturacion,
                                        folio: factura.numero_facturacion,
                                        metodoPago: factura.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${factura.documento_facturacion}`,
                                    })
                                }
                            }
                        }



                        infoPagos.ingresoTotal = arrayPagosCliente.montoTotal + arrayPagosReemplazo.montoTotal + arrayPagosDanio.montoTotal;
                        infoPagos.pagosEmpresaReemplazo = arrayPagosReemplazo;
                        infoPagos.pagosCliente = arrayPagosCliente;
                        infoPagos['pagosDaños'] = arrayPagosDanio;

                    } else {


                        const arrayPagosCliente = {
                            montoTotal: 0,
                            comprobantes: [],
                            pagos: []
                        };
                        const arrayPagosExtras = {
                            montoTotal: 0,
                            comprobantes: [],
                            pagos: []
                        };
                        const arrayPagosDanio = {
                            montoTotal: 0,
                            comprobantes: [],
                            pagos: []
                        };

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

                                if (pagoArriendo.pagos[0].facturacione) {
                                    pagoCliente.folio = pagoArriendo.pagos[0].facturacione.numero_facturacion;
                                }

                                arrayPagosCliente.montoTotal += pagoCliente.monto;

                                if (pagoArriendo.pagos[0].facturacione) {
                                    arrayPagosCliente.comprobantes.push({
                                        abono: pagoArriendo.pagos[0].total_pago,
                                        tipo: pagoArriendo.pagos[0].facturacione.tipo_facturacion,
                                        folio: pagoArriendo.pagos[0].facturacione.numero_facturacion,
                                        metodoPago: pagoArriendo.pagos[0].facturacione.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${pagoArriendo.pagos[0].facturacione.documento_facturacion}`,
                                    })
                                }
                                if (pagoArriendo.pagos[0].abonos.length > 0) {
                                    pagoArriendo.pagos[0].abonos.forEach((abono) => {
                                        arrayPagosCliente.comprobantes.push({
                                            abono: abono.pago_abono,
                                            tipo: abono.facturacione.tipo_facturacion,
                                            folio: abono.facturacione.numero_facturacion,
                                            metodoPago: abono.facturacione.modosPago.nombre_modoPago,
                                            url: `${process.env.PATH_SERVER}/${abono.facturacione.documento_facturacion}`,
                                        })
                                    })
                                }
                                arrayPagosCliente.pagos.push(pagoCliente);
                            }
                        })



                        if (arriendoRepo.pagosExtras.length > 0) {
                            arriendoRepo.pagosExtras.forEach((pagoExtra) => {
                                const extra = {
                                    monto: pagoExtra.monto_pagoExtra,
                                    detalle: pagoExtra.detalle_pagoExtra,
                                    updatedAt: formatFechahora(pagoExtra.updatedAt),
                                }
                                arrayPagosExtras.montoTotal += extra.monto;
                                arrayPagosExtras.pagos.push(extra);
                            });
                            if (arriendoRepo.pagosExtras[0].facturacione) {
                                arrayPagosExtras.comprobantes.push({
                                    abono: arrayPagosExtras.montoTotal,
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
                                    updatedAt: formatFechahora(pagoDanio.updatedAt),
                                }
                                arrayPagosDanio.montoTotal += danio.monto;
                                arrayPagosDanio.pagos.push(danio);
                                if (arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione) {
                                    const factura = arriendoRepo.danioVehiculos[arriendoRepo.danioVehiculos.length - 1].pagosDanio.facturacione;
                                    arrayPagosDanio.comprobantes.push({
                                        abono: arrayPagosDanio.montoTotal,
                                        tipo: factura.tipo_facturacion,
                                        folio: factura.numero_facturacion,
                                        metodoPago: factura.modosPago.nombre_modoPago,
                                        url: `${process.env.PATH_SERVER}/${factura.documento_facturacion}`,
                                    })
                                }
                            }
                        }



                        infoPagos.ingresoTotal = arrayPagosCliente.montoTotal + arrayPagosExtras.montoTotal + arrayPagosDanio.montoTotal;
                        infoPagos.pagosCliente = arrayPagosCliente;
                        infoPagos.pagosExtras = arrayPagosExtras;
                        infoPagos['pagosDaños'] = arrayPagosDanio;
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
        })



        return arriendos;
    }




}

module.exports = FinanzasBusiness;