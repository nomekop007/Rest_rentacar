const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");
const TrasladoAutorizado = require.resolve("../images/Traslado_autorizado.png");

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
                text: `Nº  ${data.id_traslado}`,
            },
            ],
        },
        {
            text: "\n",
        },
        {
            text: "\n"
        },
        {text: 'Acta de Traslado Sucursal Origen', style: 'subheader'},
        {
            text: "\n"
        },
		{
			style: 'tableExample',
			table: {
				widths: [150, '*'],
				body: [
					['Tipo Vehiculo',`${data.tipo}`],
					['Patente',`${data.patente}`],
                    ['Marca',`${data.marca}`],
					['Modelo',`${data.modelo}`],
                    ['Conductor',`${data.conductor}`],
                    ['Rut Conductor',`${data.rutConductor}`],
                    ['Sucursal Origen',`${data.origen}`],
                    ['Sucursal Destino',`${data.destino}`]
                    
				]
			}
		},
        {
            text: "\n"
        },
        {
            text: "El documento generado deja constancia de un nuevo traslado de vehiculo con la informacion presentada anteriormente. Documento valido en sucursales Rent a Car"
        },
        {
            text: "\n"
        },
          {
            text: "\n"
        },
        
        {
            fontSize: 10,
            bold: true,
            margin: [0, 10, 0, 0],
            text: `Observaciones: ${data.observacion}  `,
        },
          {
            text: "\n"
        },
          {
            text: "\n"
        },
        {
            text: "\n"
        },        {
            text: "\n"
        },        {
            text: "\n"
        },

        {
                width: 100,
                height: 100,
                image: "data:image/jpeg;base64," + (await base64(TrasladoAutorizado)),
                alignment: "center",
            },
        
        
        {
            columns: [
                [
                
                    {
                        alignment: "center",
                        text: "________________________",
                    },
                    {
                        text: `Autorizado por: ${data.userAt}  `,
                        fontSize: 8,
                        alignment: "center",
                    },
                    {
                        text: `Fecha: ${data.fecha+data.hora}`,
                        fontSize: 8,
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
                fontSize: 13,
                bold: true,
            },
            quote: {
                italics: true,
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black'
            },
            small: {
                fontSize: 8,
            },
        },
        info: {
            title: 'Acta-Traslado-RentaCar',
            author: 'Rent A Car maule',
            subject: 'Acta',
            creator: 'Mallea95',
        },
    };
}

module.exports = actaTrasladoOrigenPlantilla;