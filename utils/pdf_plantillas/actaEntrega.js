const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");

async function actaEntregaPlantilla(data) {
    console.log(data.arrayImages[0]);
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
                            width: 200,
                            height: 200,
                            image: data.imageCombustible,
                        },
                        {
                            width: 200,
                            height: 200,
                            image: data.arrayImages[0],
                        }
                    ]
                ]
            }
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
    }
}

module.exports = actaEntregaPlantilla;