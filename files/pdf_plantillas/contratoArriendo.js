const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");
const pagare = require.resolve("../images/pagare.png");

async function contratoPlantilla(data) {
    console.log(data);

    return {
        content: [{
                margin: [0, 0, 0, 5],
                columns: [{
                        width: 80,
                        height: 80,
                        image: "data:image/jpeg;base64," + (await base64(logo)),
                    },
                    {
                        margin: [10, 0, 0, 0],
                        width: 378,
                        fontSize: 9,
                        style: "header",
                        bold: true,
                        text: [
                            { text: "Rent A Car Maule \n", fontSize: 20 },
                            "Sociedad Teresa del Carmen Garrido Rojas e Hijos Limitada. RUT: 76.791.832-1 \n",
                            "2 Norte 22 y 23 Oriente N°3030, Talca. - Tlfs:+712 401552 / +569 4114 3456 - Casa Matriz \n",
                            "Calle Kurt Moller N° 22, Linares. - Tlfs:+712 439489/ +569 9219 1603 - Sucursal \n",
                            "Calle Villota N° 262, Curicó. - Tlfs: +752 606081 / +569 8194 7756 - Sucursal \n",
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
                columns: [
                    [{
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
                                            text: `MARCA MODELO: \n ${data.marca_vehiculo}  ${data.modelo_vehiculo}`,
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
                        {

                            margin: [0, 10, 5, 0],
                            alignment: 'center',
                            fontSize: 9,
                            text: "GARANTIA"
                        },

                        {
                            margin: [0, 0, 5, 0],
                            fontSize: 7,
                            style: 'tableExample',
                            table: {
                                heights: 10,
                                widths: ["*", "*", "*", "*"],
                                body: [
                                    [
                                        { text: `TARGETA DE CREDITO: \n xxxxxxx`, colSpan: 1 },

                                        { text: `FECHA VENCIMIENTO \n fecha`, colSpan: 1 },
                                        { text: `CODIGO \n codigo`, colSpan: 1 },
                                        { text: `MONTO  \n monto`, colSpan: 1 }
                                    ],
                                    [
                                        { text: `CHEQUE Nº: \n  xxxxxxxx`, colSpan: 2 },
                                        {},
                                        { text: `CODIGO AUTORIZACION \n codigoCheque`, colSpan: 2 },
                                        {}
                                    ],
                                    [
                                        { text: `EFECTIVO: `, colSpan: 4 },
                                        {},
                                        {},
                                        {},
                                    ]
                                ]
                            }
                        },

                        {
                            margin: [0, 10, 5, 0],
                            fontSize: 8,

                            style: 'tableExample',
                            table: {
                                heights: 10,
                                widths: ["*", "*"],
                                body: [
                                    [`AGENCIA DE ARRIENDO:  ${data.agencia} `, `VENDEDOR/A:  ${data.vendedor} `],

                                ]
                            }
                        },
                        {
                            columns: [{
                                margin: [0, 5, 10, 0],
                                fontSize: 5,
                                ol: [
                                    "Acepto íntegramente las condiciones del contrato.",
                                    "de acuerdo con tarifas y plazos pactados.",
                                    "Autorizo a Rent A Car Maule a verificar antecedentes comerciales.",
                                    "Deducible UF. 20 + IVA Autos y Camionetas.",
                                    "Deducible pérdida total o volcamiento.",
                                    "UF. 75 para todas las unidades."
                                ]
                            }, {
                                width: 180,
                                fontSize: 6,
                                margin: [0, 5, 10, 0],
                                text: `Observaciones: \n ${data.observaciones} `
                            }],
                        },
                        {
                            columns: [{
                                    columns: [
                                        [{
                                                margin: [0, 20, 0, 0],
                                                alignment: 'center',
                                                text: ""
                                            },
                                            {
                                                text: "_______________________________"
                                            },
                                            { text: "ARRENDATARIO/A", fontSize: 6, alignment: 'center', }
                                        ]
                                    ]
                                },

                                {
                                    columns: [
                                        [{
                                                margin: [0, 20, 0, 0],
                                                alignment: 'center',
                                                text: ""
                                            },
                                            {
                                                text: "_______________________________"
                                            },
                                            { text: "RENT A CAR", fontSize: 6, alignment: 'center', }
                                        ]
                                    ]
                                },

                            ]
                        },

                    ],
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
                                        { text: data.subtotal, fontSize: 7 },
                                    ],
                                    [
                                        "DESCUENTO (-)",
                                        { text: data.descuento, fontSize: 7 },
                                    ],
                                    //--- lista de arriendo //
                                    [
                                        { heights: 7, text: "ACCESORIO  (+)", fontSize: 7 },
                                        { heights: 7, text: "0", fontSize: 7 },
                                    ],
                                    //--------------- //
                                    [
                                        "TOTAL NETO: \n\n IVA: \n\n TOTAL:",
                                        {
                                            text: `${data.neto} \n\n ${data.iva} \n\n ${data.total} `,
                                            fontSize: 7,

                                        },
                                    ],
                                    [
                                        { text: "A PAGAR ", fontSize: 10 },
                                        { text: data.total, fontSize: 10, bold: true },
                                    ],
                                ],
                            },
                        },

                        /* {
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
                        }, */
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
            {
                margin: [0, 3, 0, 0],
                image: 'building',
                width: 528,
                height: 180,
                image: "data:image/jpeg;base64," + (await base64(pagare)),

            }

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

module.exports = { contratoPlantilla };