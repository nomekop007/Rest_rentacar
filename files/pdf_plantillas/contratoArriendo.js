const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");

async function contrato(data) {
    console.log(data);
    return {
        content: [{
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
                ],
                margin: [0, 0, 0, 10],
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
                                    { text: "CLIENTE \n nombreCliente", colSpan: 4 },
                                    {},
                                    {},
                                    {},
                                    { text: "AUTO/CAMIONETA \n tipoAuto", colSpan: 1 },
                                ],
                                [
                                    { text: "DIRECCION \n direccionCliente", colSpan: 3 },
                                    {},
                                    {},
                                    { text: "CIUDAD \n ciudadCliente", colSpan: 1 },
                                    { text: "MARCA MODELO \n modeloVehiculo", colSpan: 1 },
                                ],
                                [
                                    { text: "RUT O PASAPORTE \n rutCliente", colSpan: 2 },
                                    {},
                                    { text: "NACIMIENTO \n fechaCliente", colSpan: 1 },
                                    { text: "TELEFONO \n telefonoCliente", colSpan: 1 },
                                    { text: "PATENTE \n patenteVehiculo", colSpan: 1 },
                                ],
                                [
                                    { text: "CONDUCTOR \n nombreConductor", colSpan: 5 },
                                    {},
                                    {},
                                    {},
                                    {},
                                ],
                                [
                                    { text: "LICENCIA", colSpan: 1 },
                                    {
                                        text: "CLASE: \n\n NUMERO: \n\n VCTO: \n\n MUNIC:  ",
                                        colSpan: 1,
                                    },
                                    {
                                        text: "RUT \n rutConductor \n\n TELEFONO \ntelefonoConductor \n\n  DIRECCION \n direccionConductor    ",
                                        colSpan: 2,
                                    },
                                    {},
                                    {
                                        text: "KILOMETROS \n\n ENTRADA: \n\n\n SALIDA:",
                                        colSpan: 1,
                                    },
                                ],
                            ],
                        },
                    },
                    {
                        fontSize: 7,
                        style: "tableExample",
                        table: {
                            heights: [20, 20],
                            widths: [75, 75],
                            body: [
                                [
                                    "CIUDAD DE ENTREGA \n ciudadEntrega ",
                                    "CIUDAD DE RECEPCIÓN \n ciudadrecepcion",
                                ],
                                ["FECHA \n fechaInicio", "FECHA \n fechaFin "],
                            ],
                        },
                    },
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