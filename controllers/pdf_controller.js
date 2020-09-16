const pdf = require("html-pdf");
const fs = require("fs");
const tj = require("templatesjs");

const {
    Usuario,
    Arriendo,
    Cliente,
    Conductor,
    Empresa,
    Accesorio,
    Vehiculo,
    PagoArriendo,
    Sucursal,
} = require("../db");

class PDFController {
    async createContratoArriendoPDF(req, res) {
        const response = req.body;
        const arriendo = await Arriendo.findOne({
            where: { id_arriendo: response.id_arriendo },
            include: [
                { model: Cliente },
                { model: Empresa },
                { model: Vehiculo },
                { model: Accesorio },
                { model: Conductor },
                { model: PagoArriendo },
                { model: Sucursal },
                { model: Usuario, attributes: ["nombre_usuario"] },
            ],
        });


        //variables
        const list = {
            nombre_cliente: "",
            direccion_cliente: "",
            ciudad_cliente: "",
            rut_cliente: "",
            nacimiento_cliente: "",
            telefono_cliente: "",

            rut_conductor: arriendo.conductore.rut_conductor,
            nombre_conductor: arriendo.conductore.nombre_conductor,
            telefono_conductor: arriendo.conductore.telefono_conductor,
            clase_conductor: arriendo.conductore.clase_conductor,
            numero_conductor: arriendo.conductore.numero_conductor,
            vcto_conductor: arriendo.conductore.vcto_conductor,
            municipalidad_conductor: arriendo.conductore.municipalidad_conductor,
            direccion_conductor: arriendo.conductore.direccion_conductor,

            tipo_vehiculo: arriendo.vehiculo.tipo_vehiculo,
            marca_vehiculo: arriendo.vehiculo.marca_vehiculo,
            patente_vehiculo: arriendo.vehiculo.patente_vehiculo,
            kilometrosEntrada_arriendo: arriendo.kilometrosEntrada_arriendo,

            numero_targetaCredito: response.numero_targeta,
            fecha_targeta: response.fecha_targeta,
            cheque: response.cheque,
            abonoGarantia_pagoArriendo: arriendo.pagosArriendo.abonoGarantia_pagoArriendo,
            agencia: arriendo.sucursale.nombre_sucursal,
            vendedor: arriendo.usuario.nombre_usuario,
            observaciones: arriendo.pagosArriendo.observaciones_pagoArriendo,

            ciudad_entrega: arriendo.ciudadEntrega_arriendo,
            ciudad_recepcion: arriendo.ciudadRecepcion_arriendo,
            fecha_entrega: arriendo.fechaEntrega_arriendo,
            fecha_recepcion: arriendo.fechaRecepcion_arriendo,
            tipo_arriendo: arriendo.tipo_arriendo,

            cantidad_dias: arriendo.numeroDias_arriendo,
            subtotal: response.subtotal,
            neto: arriendo.pagosArriendo.neto_pagoArriendo,
            iva: arriendo.pagosArriendo.iva_pagoArriendo,
            total: arriendo.pagosArriendo.total_pagoArriendo
        };




        switch (arriendo.tipo_arriendo) {
            case "PARTICULAR":
                list.nombre_cliente = arriendo.cliente.nombre_cliente;
                list.direccion_cliente = arriendo.cliente.direccion_cliente;
                list.ciudad_cliente = arriendo.cliente.ciudad_cliente;
                list.rut_cliente = arriendo.cliente.rut_cliente;
                list.nacimiento_cliente = formatFecha(arriendo.cliente.fechaNacimiento_cliente);
                list.telefono_cliente = arriendo.cliente.telefono_cliente;
                break;
            case "REMPLAZO":
                list.nombre_cliente = arriendo.cliente.nombre_cliente;
                list.direccion_cliente = arriendo.cliente.direccion_cliente;
                list.ciudad_cliente = arriendo.cliente.ciudad_cliente;
                list.rut_cliente = arriendo.cliente.rut_cliente;
                list.nacimiento_cliente = formatFecha(arriendo.cliente.fechaNacimiento_cliente);
                list.telefono_cliente = arriendo.cliente.telefono_cliente;
                break;
            case "EMPRESA":
                list.nombre_cliente = arriendo.empresa.nombre_empresa;
                list.direccion_cliente = arriendo.empresa.direccion_empresa;
                list.ciudad_cliente = arriendo.empresa.ciudad_empresa;
                list.rut_cliente = arriendo.empresa.rut_empresa;
                list.telefono_cliente = arriendo.empresa.telefono_empresa;
                break;

            default:
                break;
        }


        //se cactura el file html
        const html = await fs.readFileSync(
            require.resolve("../uploads/plantillas/contrato_arriendo.html"),
            "utf8"
        );

        //HTML se tranforma a template
        tj.setSync(html);
        //se agregan las variables
        const dataHTML = await tj.renderAllSync(list);



        const option = {
            "border": {
                "top": "0.3in", // default is 0, units: mm, cm, in, px
                "right": "0.3in",
                "bottom": "0.3in",
                "left": "0.3in"
            },
        }

        await pdf
            .create(dataHTML, option)
            .toFile("./uploads/documentos/contratoArriendo.pdf", (err, r) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "algo paso"
                    });
                } else {
                    res.json({
                        success: true,
                        data: r.filename
                    });
                }
            });
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

module.exports = PDFController;