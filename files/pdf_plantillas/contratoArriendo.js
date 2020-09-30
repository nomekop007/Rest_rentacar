const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");

async function contrato(data) {
    console.log(data);
    /*   data.arrayAccesorios.forEach((element) => {
                  console.log(element);
              }); */

    return {
        content: [{
                margin: [0, 0, 0, 10],
                columns: [{
                        width: 100,
                        height: 100,
                        image: "data:image/jpeg;base64," + (await base64(logo)),
                    },
                    {
                        margin: [10, 0, 0, 0],
                        width: 318,
                        fontSize: 10,
                        style: "header",
                        bold: false,
                        text: [
                            { text: "Rent A Car Maule \n", bold: true, fontSize: 20 },
                            "Sociedad Teresa del Carmen Garrido Rojas e Hijos Limitada. RUT: 76.791.832-1",
                            " 2 Norte 22 y 23 Oriente N°3030, Talca. - Tlfs: +71 2 401552 / +569 4114 3456 - ",
                            "Casa MatrizCalle Kurt Moller N° 22, Linares. - Tlfs: +71 2 439489/ +569 9219 1603 - ",
                            "Sucursal Calle Villota N° 262, Curicó. - Tlfs: +75 2 606081 / +569 8194 7756 - Sucursal \n",
                            {
                                text: "contacto@rentacarmaule.cl - www.rentacarmaule.cl",
                                bold: true,
                            },
                        ],
                    },
                    {
                        text: `Nº  ${data.id_arriendo}`,
                    },
                ],
            },
            {
                columns: [{
                        fontSize: 8,
                        margin: [0, 0, 5, 0],
                        style: "tableExample",
                        table: {
                            heights: 25,
                            widths: [5, 90, 60, 60, 90],
                            body: [
                                [
                                    { text: `CLIENTE: \n ${data.nombre_cliente}`, colSpan: 4 },
                                    {},
                                    {},
                                    {},
                                    {
                                        text: `AUTO/CAMIONETA: \n ${data.tipo_vehiculo}`,
                                        colSpan: 1,
                                    },
                                ],
                                [{
                                        text: `DIRECCION: \n ${data.direccion_cliente}`,
                                        colSpan: 3,
                                    },
                                    {},
                                    {},
                                    { text: `CIUDAD: \n ${data.ciudad_cliente}`, colSpan: 1 },
                                    {
                                        text: `MARCA MODELO: \n ${data.marca_vehiculo}`,
                                        colSpan: 1,
                                    },
                                ],
                                [{
                                        text: `RUT O PASAPORTE: \n ${data.rut_cliente}`,
                                        colSpan: 2,
                                    },
                                    {},
                                    {
                                        text: `NACIMIENTO: \n ${data.nacimiento_cliente}`,
                                        colSpan: 1,
                                    },
                                    {
                                        text: `TELEFONO: \n +569 ${data.telefono_cliente}`,
                                        colSpan: 1,
                                    },
                                    { text: `PATENTE: \n ${data.patente_vehiculo}`, colSpan: 1 },
                                ],
                                [{
                                        text: `CONDUCTOR: \n ${data.nombre_conductor}`,
                                        colSpan: 5,
                                    },
                                    {},
                                    {},
                                    {},
                                    {},
                                ],
                                [
                                    { text: `LICENCIA`, colSpan: 1 },
                                    {
                                        text: `CLASE : \n  ${data.clase_conductor} \n\n NUMERO: \n ${data.numero_conductor} \n\n VCTO: \n ${data.vcto_conductor} \n\n MUNIC: \n ${data.municipalidad_conductor} `,
                                        colSpan: 1,
                                    },
                                    {
                                        text: `RUT: \n ${data.rut_conductor} \n\n TELEFONO: \n  +569 ${data.telefono_conductor} \n\n  DIRECCION: \n ${data.direccion_conductor}    `,
                                        colSpan: 2,
                                    },
                                    {},
                                    {
                                        text: `KILOMETROS: \n\n  ---------------------------------------- \n   ENTRADA: ${data.kilometrosEntrada_arriendo}  \n ----------------------------------------  \n  ---------------------------------------- \n  SALIDA:       \n ----------------------------------------`,
                                        colSpan: 1,
                                    },
                                ],
                            ],
                        },
                    },

                    [{
                            fontSize: 7,
                            style: `tableExample`,
                            table: {
                                widths: [75, 75],
                                body: [
                                    [
                                        `CIUDAD DE ENTREGA \n ${data.ciudad_entrega} `,
                                        `CIUDAD DE RECEPCIÓN \n ${data.ciudad_recepcion}`,
                                    ],
                                    [
                                        `FECHA - HORA \n ${data.fecha_entrega}`,
                                        `FECHA - HORA \n ${data.fecha_recepcion} `,
                                    ],
                                    [{
                                            text: `TIPO ARRIENDO: \n  ${data.tipo_arriendo}`,
                                            colSpan: 2,
                                        },
                                        {},
                                    ],
                                    [{
                                            text: `CANTIDAD DE DIAS: \n  ${data.cantidad_dias}`,
                                            colSpan: 2,
                                        },
                                        {},
                                    ],
                                    [
                                        "SUB TOTAL NETO:",
                                        { text: data.subtotal, fontSize: 11, bold: true },
                                    ],
                                    [
                                        "DESCUENTO (-)",
                                        { text: data.descuento, fontSize: 11, bold: true },
                                    ],
                                    //--- lista de arriendo //
                                    [
                                        { heights: 8, text: "ACCESORIO  (+)", fontSize: 6 },
                                        { heights: 8, text: "0", fontSize: 6, bold: true },
                                    ],
                                    //--------------- //
                                    [
                                        "TOTAL NETO: \n\n IVA: \n\n TOTAL:",
                                        {
                                            text: `${data.neto} \n ${data.iva} \n ${data.total} `,
                                            fontSize: 11,
                                            bold: true,
                                        },
                                    ],
                                    [
                                        { text: "A PAGAR ", fontSize: 11 },
                                        { text: data.total, fontSize: 11, bold: true },
                                    ],
                                ],
                            },
                        },
                        {
                            margin: [0, 10, 0, 0],
                            style: "tableExample",
                            fontSize: 8,
                            table: {
                                widths: [75, 75],
                                fontSize: 8,

                                body: [
                                    [
                                        [
                                            "FACTURACION",
                                            {
                                                table: {
                                                    body: [
                                                        ["Boleta", "X"],
                                                        ["Factura", ""],
                                                    ],
                                                },
                                            },
                                        ],
                                        [
                                            "TIPO PAGO",
                                            {
                                                table: {
                                                    body: [
                                                        ["Efectivo", ""],
                                                        ["Cheque", ""],
                                                        ["Targeta", "X"],
                                                    ],
                                                },
                                            },
                                        ],
                                    ],
                                ],
                            },
                        },
                        {
                            margin: [0, 10, 0, 0],
                            style: "tableExample",
                            fontSize: 8,
                            table: {
                                widths: [160],
                                body: [
                                    [`DIGITADO POR \n  ${data.vendedor}`]
                                ],
                            },
                        },
                    ],
                ],
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            subheader: {
                fontSize: 15,
                bold: true,
            },
            quote: {
                italics: true,
            },
            small: {
                fontSize: 8,
            },
        },
    };
}

module.exports = { contrato };