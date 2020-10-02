const {
    Usuario,
    Arriendo,
    Cliente,
    Conductor,
    Empresa,
    Accesorio,
    Vehiculo,
    Sucursal,
} = require("../db");
const { contratoPlantilla } = require("../files/pdf_plantillas/contratoArriendo");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class contrato_controller {
    async createPDFContrato(req, res) {
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
                { model: Usuario, attributes: ["nombre_usuario"] },
            ],
        });

        //variables
        const dataList = {
            rut_conductor: arriendo.conductore.rut_conductor,
            nombre_conductor: arriendo.conductore.nombre_conductor,
            telefono_conductor: arriendo.conductore.telefono_conductor,
            clase_conductor: arriendo.conductore.clase_conductor,
            numero_conductor: arriendo.conductore.numero_conductor,
            vcto_conductor: formatFecha(arriendo.conductore.vcto_conductor),
            municipalidad_conductor: arriendo.conductore.municipalidad_conductor,
            direccion_conductor: arriendo.conductore.direccion_conductor,

            tipo_vehiculo: arriendo.vehiculo.tipo_vehiculo,
            marca_vehiculo: arriendo.vehiculo.marca_vehiculo,
            modelo_vehiculo: arriendo.vehiculo.modelo_vehiculo,
            patente_vehiculo: arriendo.vehiculo.patente_vehiculo,

            agencia: arriendo.sucursale.nombre_sucursal,
            vendedor: arriendo.usuario.nombre_usuario,
            kilometrosEntrada_arriendo: arriendo.kilometrosEntrada_arriendo,
            id_arriendo: arriendo.id_arriendo,
            ciudad_entrega: arriendo.ciudadEntrega_arriendo,
            ciudad_recepcion: arriendo.ciudadRecepcion_arriendo,
            fecha_entrega: formatFechahora(arriendo.fechaEntrega_arriendo),
            fecha_recepcion: formatFechahora(arriendo.fechaRecepcion_arriendo),
            tipo_arriendo: arriendo.tipo_arriendo,
            cantidad_dias: arriendo.numerosDias_arriendo,


            numero_tarjeta: "",
            fecha_tarjeta: "",
            codigo_tarjeta: "",

            numero_cheque: "",
            codigo_cheque: "",

            efectivo: "",


            tipoPago: response.tipoPago,
            tipoFacturacion: response.tipoFacturacion,
            numero_boleta: "",
            numero_factura: "",


            subtotal: response.subtotal,
            neto: response.neto,
            descuento: response.descuento,
            iva: response.iva,
            total: response.total,
            observaciones: response.observaciones,
            arrayAccesorios: response.arrayAccesorios,
        };

        switch (arriendo.tipo_arriendo) {
            case "PARTICULAR":
                dataList.nombre_cliente = arriendo.cliente.nombre_cliente;
                dataList.direccion_cliente = arriendo.cliente.direccion_cliente;
                dataList.ciudad_cliente = arriendo.cliente.ciudad_cliente;
                dataList.rut_cliente = arriendo.cliente.rut_cliente;
                dataList.nacimiento_cliente = formatFecha(
                    arriendo.cliente.fechaNacimiento_cliente
                );
                dataList.telefono_cliente = arriendo.cliente.telefono_cliente;
                break;
            case "REMPLAZO":
                dataList.nombre_cliente = arriendo.cliente.nombre_cliente;
                dataList.direccion_cliente = arriendo.cliente.direccion_cliente;
                dataList.ciudad_cliente = arriendo.cliente.ciudad_cliente;
                dataList.rut_cliente = arriendo.cliente.rut_cliente;
                dataList.nacimiento_cliente = formatFecha(
                    arriendo.cliente.fechaNacimiento_cliente
                );
                dataList.telefono_cliente = arriendo.cliente.telefono_cliente;
                break;
            case "EMPRESA":
                dataList.nombre_cliente = arriendo.empresa.nombre_empresa;
                dataList.direccion_cliente = arriendo.empresa.direccion_empresa;
                dataList.ciudad_cliente = arriendo.empresa.ciudad_empresa;
                dataList.rut_cliente = arriendo.empresa.rut_empresa;
                dataList.telefono_cliente = arriendo.empresa.telefono_empresa;
                dataList.nacimiento_cliente = arriendo.empresa.vigencia_empresa;
                break;

            default:
                break;
        }

        //valida para asegurar que no se cree otro contrato
        if (arriendo.estado_arriendo === "PENDIENTE") {
            //se genera el documento
            const docDefinition = await contratoPlantilla(dataList);
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getBase64((url) => {
                res.json({
                    success: true,
                    data: {
                        url: url,
                        pago: response,
                    },
                });
            });
        } else {
            res.json({
                success: false,
                msg: "el contrato ya esta firmado!",
            });
        }
    }
}

function formatFecha(fecha) {
    let f = new Date(fecha);
    let opciones = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    };
    return (fecha = f.toLocaleDateString("es-MX", opciones));
}

function formatFechahora(fecha) {
    let f = new Date(fecha);
    let opciones = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return (fecha = f.toLocaleDateString("es-MX", opciones));
}

module.exports = contrato_controller;