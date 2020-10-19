const {
    Usuario,
    Arriendo,
    Cliente,
    Conductor,
    Empresa,
    Accesorio,
    Vehiculo,
    Sucursal,
    Contrato,
    Remplazo,
    Garantia,
    ModoPago,
} = require("../db");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { v5: uuidv5 } = require("uuid");

const PdfPrinter = require("pdfmake");
const contratoPlantilla = require("../utils/pdf_plantillas/contratoArriendo");

class contrato_controller {
    async generatePDFContrato(req, res) {
        try {
            const response = req.body;
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: response.id_arriendo },
                include: [
                    { model: Cliente },
                    { model: Empresa },
                    { model: Vehiculo },
                    { model: Accesorio },
                    { model: Conductor },
                    { model: Sucursal },
                    {
                        model: Remplazo,
                        include: [{ model: Cliente }],
                    },
                    {
                        model: Garantia,
                        include: [{ model: ModoPago }],
                    },
                    { model: Usuario, attributes: ["nombre_usuario"] },
                ],
            });

            //variables
            const dataList = {
                firmaPNG: response.firmaPNG,
                rut_conductor: arriendo.conductore.rut_conductor,
                nombre_conductor: arriendo.conductore.nombre_conductor,
                telefono_conductor: arriendo.conductore.telefono_conductor,
                clase_conductor: arriendo.conductore.clase_conductor,
                numero_conductor: arriendo.conductore.numero_conductor,
                vcto_conductor: arriendo.conductore.vcto_conductor ?
                    formatFecha(arriendo.conductore.vcto_conductor) : "",
                municipalidad_conductor: arriendo.conductore.municipalidad_conductor,
                direccion_conductor: arriendo.conductore.direccion_conductor,

                tipo_vehiculo: arriendo.vehiculo.tipo_vehiculo,
                marca_vehiculo: arriendo.vehiculo.marca_vehiculo,
                modelo_vehiculo: arriendo.vehiculo.modelo_vehiculo,
                patente_vehiculo: arriendo.vehiculo.patente_vehiculo,

                agencia: arriendo.sucursale.nombre_sucursal,
                vendedor: arriendo.usuario.nombre_usuario,
                kilometrosEntrada_arriendo: arriendo.kilometrosEntrada_arriendo,
                kilometrosMantencion_arriendo: arriendo.kilometrosMantencion_arriendo,
                id_arriendo: arriendo.id_arriendo,
                ciudad_entrega: arriendo.ciudadEntrega_arriendo,
                ciudad_recepcion: arriendo.ciudadRecepcion_arriendo,
                fecha_entrega: formatFechahora(arriendo.fechaEntrega_arriendo),
                fecha_recepcion: formatFechahora(arriendo.fechaRecepcion_arriendo),
                tipo_arriendo: arriendo.tipo_arriendo,
                cantidad_dias: arriendo.numerosDias_arriendo,

                tipoGarantia: arriendo.garantia.modosPago.nombre_modoPago,
                numero_tarjeta: arriendo.garantia.numeroTarjeta_garantia,
                fecha_tarjeta: arriendo.garantia.fechaTarjeta_garantia,
                codigo_tarjeta: arriendo.garantia.codigoTarjeta_garantia,
                numero_cheque: arriendo.garantia.numeroCheque_garantia,
                codigo_cheque: arriendo.garantia.codigoCheque_garantia,
                abono: arriendo.garantia.monto_garantia,

                tipoPago: response.tipoPago,
                tipoFacturacion: response.tipoFacturacion,
                numeroFacturacion: response.numFacturacion,
                valorArriendo: response.valorArriendo,
                valorCopago: response.valorCopago,
                neto: response.neto,
                descuento: response.descuento,
                iva: response.iva,
                total: response.total,
                observaciones: response.observaciones,
                arrayNombreAccesorios: response.arrayNombreAccesorios,
                arrayValorAccesorios: response.arrayValorAccesorios,
            };

            switch (arriendo.tipo_arriendo) {
                case "PARTICULAR":
                    dataList.nombre_cliente = arriendo.cliente.nombre_cliente;
                    dataList.direccion_cliente = arriendo.cliente.direccion_cliente;
                    dataList.ciudad_cliente = arriendo.cliente.ciudad_cliente;
                    dataList.estadoCivil_cliente = arriendo.cliente.estadoCivil_cliente;
                    dataList.rut_cliente = arriendo.cliente.rut_cliente;
                    dataList.nacimiento_cliente = arriendo.cliente.fechaNacimiento_cliente ?
                        formatFecha(arriendo.cliente.fechaNacimiento_cliente) :
                        "";
                    dataList.telefono_cliente = arriendo.cliente.telefono_cliente;
                    break;
                case "REMPLAZO":
                    dataList.nombre_cliente = arriendo.remplazo.cliente.nombre_cliente;
                    dataList.direccion_cliente =
                        arriendo.remplazo.cliente.direccion_cliente;
                    dataList.ciudad_cliente = arriendo.remplazo.cliente.ciudad_cliente;
                    dataList.rut_cliente = arriendo.remplazo.cliente.rut_cliente;
                    dataList.nacimiento_cliente = arriendo.remplazo.cliente
                        .fechaNacimiento_cliente ?
                        formatFecha(arriendo.remplazo.cliente.fechaNacimiento_cliente) :
                        "";
                    dataList.telefono_cliente =
                        arriendo.remplazo.cliente.telefono_cliente;
                    dataList.remplazo = arriendo.remplazo.nombreEmpresa_remplazo;
                    break;
                case "EMPRESA":
                    dataList.nombre_cliente = arriendo.empresa.nombre_empresa;
                    dataList.direccion_cliente = arriendo.empresa.direccion_empresa;
                    dataList.ciudad_cliente = arriendo.empresa.ciudad_empresa;
                    dataList.rut_cliente = arriendo.empresa.rut_empresa;
                    dataList.telefono_cliente = arriendo.empresa.telefono_empresa;
                    dataList.nacimiento_cliente = arriendo.empresa.vigencia_empresa;
                    break;
            }

            //valida para asegurar que no se cree otro contrato
            if (arriendo.estado_arriendo === "PENDIENTE") {
                //se genera el documento
                const docDefinition = await contratoPlantilla(dataList);

                var fonts = {
                    Roboto: {
                        normal: require.resolve("../utils/fonts/Roboto-Regular.ttf"),
                        bold: require.resolve("../utils/fonts/Roboto-Medium.ttf"),
                        italics: require.resolve("../utils/fonts/Roboto-Italic.ttf"),
                        bolditalics: require.resolve(
                            "../utils/fonts/Roboto-MediumItalic.ttf"
                        ),
                    },
                };
                const nameFile = uuidv5(arriendo.id_arriendo + "", uuidv5.URL);

                var printer = new PdfPrinter(fonts);
                const pdfDoc = printer.createPdfKitDocument(docDefinition);

                //se guarda el pdf en una ruta predeterminada
                pdfDoc.pipe(
                    fs.createWriteStream(
                        path.join(
                            __dirname,
                            "../uploads/documentos/contratos/" + nameFile + ".pdf"
                        )
                    )
                );
                pdfDoc.end();

                setTimeout(() => {
                    res.json({
                        success: true,
                        data: {
                            nombre_documento: nameFile,
                            firma: response.firmaPNG,
                        },
                    });
                }, 2000);
            } else {
                res.json({
                    success: true,
                    msg: "el contrato ya esta firmado!",
                });
            }
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async createContrato(req, res) {
        try {
            const response = req.body;
            const contrato = await Contrato.create(response);
            res.json({
                success: true,
                data: contrato,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

function formatFecha(fecha) {
    let f = new Date(fecha);
    return moment(f).format("DD-MM-YYYY");
}

function formatFechahora(fecha) {
    var f = new Date(fecha);
    return moment(f).format("DD-MM-YYYY  HH:mm a");
}

module.exports = contrato_controller;