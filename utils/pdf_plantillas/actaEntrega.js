const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");

async function actaEntregaPlantilla(data) {
    const arrayImagenes = () => {
        const images = [];
        for (let i = 0; i < data.arrayImages.length; i++) {
            images.push({
                margin: [0, 30, 0, 0],
                width: 520,
                height: 300,
                image: data.arrayImages[i],
            });
        }
        return images;
    };
    const matriz_si = (value, fila) => {
        if (data.matrizRecepcion[fila].indexOf(value) != -1) {
            return "X";
        } else {
            return "";
        }
    };
    const matriz_no = (value, fila) => {
        if (data.matrizRecepcion[fila].indexOf(value) === -1) {
            return "X";
        } else {
            return "";
        }
    };

    const firmaRecibidor = () => {
        if (data.firma1PNG) {
            return {
                margin: [0, 50, 0, 0],
                alignment: "center",
                width: 175,
                height: 75,
                image: data.firma1PNG,
            };
        } else {
            return {
                margin: [0, 125, 0, 0],
                alignment: "center",
                text: "",
            };
        }
    };

    const firmaEntregador = () => {
        if (data.firma2PNG) {
            return {
                margin: [0, 50, 0, 0],
                alignment: "center",
                width: 175,
                height: 75,
                image: data.firma2PNG,
            };
        } else {
            return {
                margin: [0, 125, 0, 0],
                alignment: "center",
                text: "",
            };
        }
    };

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
                        text: `Nº  ${data.id_arriendo}`,
                    },
                ],
            },
            {
                margin: [0, 20, 0, 0],
                fontSize: 10,
                alignment: "justify",
                columns: [
                    { text: `VEHICULO : ${data.vehiculo.modelo_vehiculo} ` },
                    { text: `AÑO : ${data.vehiculo.año_vehiculo}` },
                    { text: `MODELO : ${data.vehiculo.modelo_vehiculo}` },
                ],
            },
            {
                text: "\n",
            },
            {
                alignment: "justify",
                fontSize: 10,
                columns: [
                    { text: `COLOR : ${data.vehiculo.color_vehiculo}` },
                    { text: `PATENTE : ${data.vehiculo.patente_vehiculo}` },
                    { text: `KILOMETRAJE : ${data.kilometraje}` },
                ],
            },
            {
                text: "\n",
            },
            {
                alignment: "justify",
                fontSize: 10,
                columns: [
                    { text: `DESTINO : ${data.destinoDespacho}` },
                    { text: `PROCEDENCIA DE : ${data.procedenciaDesdeDespacho}` },
                    { text: `A : ${data.procedenciaHaciaDespacho}` },
                ],
            },

            {
                margin: [0, 20, 0, 5],
                fontSize: 10,
                bold: true,
                text: "Control de Recepción:",
            },
            {
                fontSize: 8,
                table: {
                    heights: 12,
                    widths: [105, 20, 20, 105, 20, 20, 105, 20, 20],
                    body: [
                        ["", "SI", "NO", "", "SI", "NO", "", "SI", "NO"],
                        [{ text: "", colSpan: 9 }],
                        [
                            "Documentación:",
                            matriz_si("a1", 0),
                            matriz_no("a1", 0),
                            "Encendedor:",
                            matriz_si("b1", 1),
                            matriz_no("b1", 1),
                            "Tapas de rueda ( ):",
                            matriz_si("c1", 2),
                            matriz_no("c1", 2),
                        ],
                        [
                            "Inscripción:",
                            matriz_si("a2", 0),
                            matriz_no("a2", 0),
                            "Doble juego llaves:",
                            matriz_si("b2", 1),
                            matriz_no("b2", 1),
                            "Plumillas ( ):",
                            matriz_si("c2", 2),
                            matriz_no("c2", 2),
                        ],
                        [
                            "Permiso Circ.:",
                            matriz_si("a3", 0),
                            matriz_no("a3", 0),
                            "Pisos de goma:",
                            matriz_si("b3", 1),
                            matriz_no("b3", 1),
                            "Antena O.K.:",
                            matriz_si("c3", 2),
                            matriz_no("c3", 2),
                        ],
                        [
                            "Rev. Técnica:",
                            matriz_si("a4", 0),
                            matriz_no("a4", 0),
                            "Tapiz O.K.:",
                            matriz_si("b4", 1),
                            matriz_no("b4", 1),
                            "Micas O.K.:",
                            matriz_si("c4", 2),
                            matriz_no("c4", 2),
                        ],
                        [
                            "Seguro Oblig:",
                            matriz_si("a5", 0),
                            matriz_no("a5", 0),
                            "Radio O.K.:",
                            matriz_si("b5", 1),
                            matriz_no("b5", 1),
                            "Pintura O.K.:",
                            matriz_si("c5", 2),
                            matriz_no("c5", 2),
                        ],
                        [
                            "Otros:",
                            matriz_si("a6", 0),
                            matriz_no("a6", 0),
                            "Tocacintas O.K.:",
                            matriz_si("b6", 1),
                            matriz_no("b6", 1),
                            "Nivel Aceite O.K.",
                            matriz_si("c6", 2),
                            matriz_no("c6", 2),
                        ],
                        [
                            "INTERIOR:",
                            matriz_si("a7", 0),
                            matriz_no("a7", 0),
                            "Bocina O.K.:",
                            matriz_si("b7", 1),
                            matriz_no("b7", 1),
                            "Tapa Bencina:",
                            matriz_si("c7", 2),
                            matriz_no("c7", 2),
                        ],
                        [
                            "Manual:",
                            matriz_si("a8", 0),
                            matriz_no("a8", 0),
                            "Luces O.K.:",
                            matriz_si("b8", 1),
                            matriz_no("b8", 1),
                            "R.Repuesto:",
                            matriz_si("c8", 2),
                            matriz_no("c8", 2),
                        ],
                        [
                            "Garantía:",
                            matriz_si("a9", 0),
                            matriz_no("a9", 0),
                            "Señalizadores O.K.:",
                            matriz_si("b9", 1),
                            matriz_no("b9", 1),
                            "Gata/Barrote:",
                            matriz_si("c9", 2),
                            matriz_no("c9", 2),
                        ],
                        [
                            "Cinturones:",
                            matriz_si("a10", 0),
                            matriz_no("a10", 0),
                            "Luz Emergencia O.K.:",
                            matriz_si("b10", 1),
                            matriz_no("b10", 1),
                            "Herramientas:",
                            matriz_si("c10", 2),
                            matriz_no("c10", 2),
                        ],
                        [
                            "Espejos Interior:",
                            matriz_si("a11", 0),
                            matriz_no("a11", 0),
                            "Calefacción O.K.:",
                            matriz_si("b11", 1),
                            matriz_no("b11", 1),
                            "Parachoques O.K.:",
                            matriz_si("c11", 2),
                            matriz_no("c11", 2),
                        ],
                        [
                            "Espejos Exterior:",
                            matriz_si("a12", 0),
                            matriz_no("a12", 0),
                            "Defroster O.K.:",
                            matriz_si("b12", 1),
                            matriz_no("b12", 1),
                            "Batería O.K.:",
                            matriz_si("c12", 2),
                            matriz_no("c12", 2),
                        ],
                        [
                            "Parasoles:",
                            matriz_si("a13", 0),
                            matriz_no("a13", 0),
                            "Freno de Mano O.K.:",
                            matriz_si("b13", 1),
                            matriz_no("b13", 1),
                            "Adhesivo Interior:",
                            matriz_si("c13", 2),
                            matriz_no("c13", 2),
                        ],
                        [
                            "Ceniceros:",
                            matriz_si("a14", 0),
                            matriz_no("a14", 0),
                            "CHALECO REFLECTANTE:",
                            matriz_si("b14", 1),
                            matriz_no("b14", 1),
                            "Placa:",
                            matriz_si("c14", 2),
                            matriz_no("c14", 2),
                        ],
                    ],
                },
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
                    text: data.observacionesDespacho,
                }, ],
            },
            {
                columns: [
                    [
                        firmaRecibidor(),
                        {
                            alignment: "center",
                            text: "________________________",
                        },
                        {
                            text: `RECIBIDO POR: ${data.recibidorDespacho}  `,
                            fontSize: 6,
                            alignment: "center",
                        },
                    ],
                    [
                        firmaEntregador(),
                        {
                            alignment: "center",
                            text: "________________________",
                        },
                        {
                            text: `ENTREGADO POR: ${data.entregadorDespacho} `,
                            fontSize: 6,
                            alignment: "center",
                        },
                    ],
                    [{
                        margin: [20, 0, 0, 0],

                        width: 150,
                        height: 150,
                        image: data.imageCombustible,
                    }, ],
                ],
            },
            {
                margin: [0, 50, 0, 0],

                fontSize: 8,
                text: `Fecha: ${data.fecha}  Hora: ${data.hora} `,
            },
            {
                margin: [0, 200, 0, 20],
                fontSize: 9,
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
    };
}

module.exports = actaEntregaPlantilla;