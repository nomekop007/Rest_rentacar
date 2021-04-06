const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");

async function actaTrasladoOrigenPlantilla(data) {

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
                    { text: "Rent A Car Maule Ltda. \n", fontSize: 20 },
                    "Sociedad Teresa del Carmen Garrido Rojas e Hijos Limitada. \n RUT: 76.791.832-1 \n",
                    "2 Norte 22 y 23 Oriente N°3030, Talca. - Tlfs: +712401552 / +56941143456 - Casa Matriz \n",
                    "Calle Kurt Moller N° 22, Linares. - Tlfs: +712439489/ +56992191603 - Sucursal \n",
                    "Calle Villota N° 262, Curicó. - Tlfs: +752606081 / +56981947756 - Sucursal \n",
                    {
                        text: "contacto@rentacarmaule.cl - www.rentacarmaule.cl",
                        bold: true,
                    },
                ],
            },
            {
                text: `Nº  asdasdasd`,
            },
            ],
        },
        {
            margin: [0, 20, 0, 0],
            fontSize: 10,
            alignment: "justify",
            columns: [
                { text: `VEHICULO : ${"jjjj"} ` },
                { text: `AÑO :${"jjjj"}` },
                { text: `MODELO : ${"jjjj"}` },
            ],
        },
        {
            text: "\n",
        },
        {
            alignment: "justify",
            fontSize: 10,
            columns: [
                { text: `COLOR : ${"jjjj"}` },
                { text: `PATENTE : ${"fff"}` },
                { text: `KILOMETRAJE : ${"jjjj"}` },
            ],
        },
        {
            text: "\n",
        },
        {
            alignment: "justify",
            fontSize: 10,
            columns: [
                { text: `DESTINO : ${"jjjj"}` },
                { text: `PROCEDENCIA DE : ${"jjjj"}` },
                { text: `A : ${"jjjj"}` },
            ],
        },

        {
            margin: [0, 20, 0, 5],
            fontSize: 10,
            bold: true,
            text: "Control de Despacho : ",
        },
        {
            fontSize: 10,
            bold: true,
            margin: [0, 10, 0, 0],
            text: "OBSERVACIONES:",
        },

        {
            alignment: "justify",
            columns: [{
                width: 350,
                fontSize: 9,
                text: `A : ${"jjjj"}`,
            },],
        },
        {
            columns: [
                [
                
                    {
                        alignment: "center",
                        text: "________________________",
                    },
                    {
                        text: `RECIBIDO POR: asdasdads  `,
                        fontSize: 6,
                        alignment: "center",
                    },
                ],
                [

                    {
                        alignment: "center",
                        text: "________________________",
                    },
                    {
                        text: `ENTREGADO POR: jajaja `,
                        fontSize: 6,
                        alignment: "center",
                    },
                ]
            ],
        }
        /* lista de imagenes */
        ],

        pageMargins: [40, 30, 40, 20],
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
        info: {
            title: 'Acta-Entrega-Arriendo',
            author: 'Rent A Car maule',
            subject: 'contrato',
            creator: 'nomekop007',
        },
    };
}

module.exports = actaTrasladoOrigenPlantilla;