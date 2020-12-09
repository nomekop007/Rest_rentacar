const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");

async function recepcionPlantilla(data) {
    const arrayImagenes = () => {
        const images = [];
        for (let i = 0; i < data.arrayImages.length; i++) {
            images.push({
                margin: [0, 10, 0, 0],
                fit: [500, 500],
                image: data.arrayImages[i],
            });
        }
        return images;
    };

    let descripcion = "";
    if (data.descripcion_danio) {
        descripcion = data.descripcion_danio
    }


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
                text: `Nº  ${data.id_despacho}`,
            },
            ],
        },
        {
            margin: [0, 10, 0, 0],
            fontSize: 10,
            text: `
            NOMBRE MECANICO: _________________________________

            PATENTE VEHICULO: _________________________________

            COSTO DAÑO DEL VEHICULO: _____________________________

            DESCRIPCION DEL DAÑO : ${descripcion}`,
        },
        {
            margin: [0, 20, 0, 0],
            fontSize: 10,
            text: `FECHA: ${data.fecha}  HORA: ${data.hora}  USUARIO: ${data.userAt}`,
        },
        {
            margin: [0, 50, 0, 0],
            fontSize: 10,
            bold: true,
            alignment: "center",
            columns: [{
                text: " [_]  ABOLLADURAS",
            },
            {
                text: "O RAYADURAS",
            },
            {
                text: "X PIEZAS ROTAS",
            },
            ],
        },
        /* lista de imagenes */
        {
            columns: [
                [arrayImagenes()]
            ],
        },

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
            title: 'Recepcion-arriendo',
            author: 'Rent A Car maule',
            subject: 'documento',
            creator: 'nomekop007',
        },
    };
}

module.exports = recepcionPlantilla;