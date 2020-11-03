const base64 = require("image-to-base64");
const logo = require.resolve("../images/logo.png");
const pagare = require.resolve("../images/pagare.png");

async function contratoPlantilla(data) {
    //clase para cambiar numeros a monedas
    const formatter = new Intl.NumberFormat("CL");
    const image = await base64(pagare);

    let traslado = 0;
    let deducible = 0;
    let bencina = 0;
    let enganche = 0;
    let silla = 0;
    let pase = 0;
    let rastreo = 0;
    let otros = 0;

    //se añade los precios de los accesorios que se compro
    if (data.arrayNombreAccesorios != null) {
        var nombre = data.arrayNombreAccesorios.split(",");
        var valor = data.arrayValorAccesorios.split(",");

        for (let i = 0; i < nombre.length; i++) {
            switch (nombre[i]) {
                case "TRASLADO":
                    traslado = valor[i];
                    break;
                case "DEDUCIBLE":
                    deducible = valor[i];
                    break;
                case "BENCINA":
                    bencina = valor[i];
                    break;
                case "ENGANCHE":
                    enganche = valor[i];
                    break;
                case "SILLA PARA BEBE":
                    silla = valor[i];
                    break;
                case "PASE DIARIO":
                    pase = valor[i];
                    break;
                case "RASTREO SATELITAL":
                    rastreo = valor[i];
                    break;
                default:
                    otros = valor[i];
                    break;
            }
        }
    }

    //tipos de facturacion
    switch (data.tipoFacturacion) {
        case "BOLETA":
            var boleta = "X";
            var factura = "";
            var numBoleta = data.numeroFacturacion;
            var numFactura = "";
            break;

        case "FACTURA":
            var boleta = "";
            var factura = "X";
            var numBoleta = "";
            var numFactura = data.numeroFacturacion;
            break;
    }

    //tipo pago
    switch (data.tipoPago) {
        case "EFECTIVO":
            var efectivo = "X";
            var cheque = "";
            var tarjeta = "";
            break;
        case "CHEQUE":
            var efectivo = "";
            var cheque = "X";
            var tarjeta = "";
            break;
        case "TARJETA":
            var efectivo = "";
            var cheque = "";
            var tarjeta = "X";
            break;
    }

    //tipo garantia
    var garantiaTarjeta = "";
    var garantiaEfectivo = "";
    switch (data.tipoGarantia) {
        case "EFECTIVO":
            data.numero_tarjeta = "";
            data.fecha_tarjeta = "";
            data.codigo_tarjeta = "";
            data.numero_cheque = "";
            data.codigo_cheque = "";
            garantiaEfectivo = "$ " + formatter.format(data.abono);
            break;
        case "CHEQUE":
            data.numero_tarjeta = "";
            data.fecha_tarjeta = "";
            data.codigo_tarjeta = "";
            data.abono = "";
            break;
        case "TARJETA":
            data.numero_cheque = "";
            data.codigo_cheque = "";
            garantiaTarjeta = "$ " + formatter.format(data.abono);
            break;
    }

    const firmaCliente = () => {
        if (data.firmaPNG) {
            return {
                alignment: "center",
                width: 171,
                height: 71,
                image: data.firmaPNG,
            };
        } else {
            return {
                margin: [0, 80, 0, 0],
                alignment: "center",
                text: "",
            };
        }
    };
    const firmaPagare = () => {
        if (data.firmaPNG) {
            return {
                margin: [400, 740, 0, 0],
                width: 150,
                height: 70,
                image: data.firmaPNG,
            };
        } else {
            return {};
        }
    };
    const fechaHoraFirma = () => {
        if (data.firmaPNG) {
            return {
                alignment: "center",
                text: `${data.fechaHoraFirma}
                ${data.geolocalizacion}`,
                fontSize: 3,
            };
        } else {
            return {};
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
                                        {
                                            text: `PATENTE: \n ${data.patente_vehiculo}`,
                                            colSpan: 1,
                                        },
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
                            alignment: "center",
                            fontSize: 9,
                            text: "GARANTIA",
                        },

                        {
                            margin: [0, 0, 5, 0],
                            fontSize: 7,
                            style: "tableExample",
                            table: {
                                heights: 10,
                                widths: ["*", "*", "*", "*"],
                                body: [
                                    [{
                                            text: `TARJETA DE CREDITO: \n ${data.numero_tarjeta}`,
                                            colSpan: 1,
                                        },

                                        {
                                            text: `FECHA VENCIMIENTO \n ${data.fecha_tarjeta}`,
                                            colSpan: 1,
                                        },
                                        { text: `CODIGO \n ${data.codigo_tarjeta}`, colSpan: 1 },
                                        {
                                            text: `MONTO  \n ${garantiaTarjeta}`,
                                            colSpan: 1,
                                        },
                                    ],
                                    [{
                                            text: `CHEQUE Nº: \n  ${data.numero_cheque}`,
                                            colSpan: 2,
                                        },
                                        {},
                                        {
                                            text: `CODIGO AUTORIZACION \n ${data.codigo_cheque}`,
                                            colSpan: 2,
                                        },
                                        {},
                                    ],
                                    [{
                                            text: `EFECTIVO: ${garantiaEfectivo}`,
                                            colSpan: 4,
                                        },
                                        {},
                                        {},
                                        {},
                                    ],
                                ],
                            },
                        },

                        {
                            margin: [0, 10, 5, 0],
                            fontSize: 8,

                            style: "tableExample",
                            table: {
                                heights: 10,
                                widths: ["*", "*"],
                                body: [
                                    [
                                        `AGENCIA DE ARRIENDO:  ${data.agencia} `,
                                        `VENDEDOR/A:  ${data.vendedor} `,
                                    ],
                                ],
                            },
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
                                        "UF. 75 para todas las unidades.",
                                    ],
                                },
                                {
                                    width: 180,
                                    fontSize: 6,
                                    margin: [0, 5, 10, 0],
                                    text: `Observaciones: \n ${data.observaciones} `,
                                },
                            ],
                        },
                        {
                            columns: [{
                                    columns: [
                                        [
                                            firmaCliente(),
                                            fechaHoraFirma(),
                                            { text: "_______________________________" },

                                            {
                                                text: "ARRENDATARIO/A",
                                                fontSize: 6,
                                                alignment: "center",
                                            },
                                        ],
                                    ],
                                },

                                {
                                    columns: [
                                        [{
                                                margin: [0, 80, 0, 0],
                                                alignment: "center",
                                                text: "",
                                            },
                                            {
                                                text: "_______________________________",
                                            },
                                            { text: "RENT A CAR", fontSize: 6, alignment: "center" },
                                        ],
                                    ],
                                },
                            ],
                        },
                    ],
                    [{
                            fontSize: 6,
                            style: `tableExample`,
                            table: {
                                widths: [73, 73],
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
                                            text: `TIPO ARRIENDO: \n  ${data.tipo_arriendo} ${
                        data.remplazo ? data.remplazo : ""
                      }`,
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
                                        "VALOR ARRIENDO:",
                                        {
                                            text: "$ " + formatter.format(data.valorArriendo),
                                            fontSize: 7,
                                        },
                                    ],
                                    [
                                        "VALOR COPAGO (-) :",
                                        {
                                            text: "$ " + formatter.format(data.valorCopago),
                                            fontSize: 7,
                                        },
                                    ],
                                    [
                                        "SUB TOTAL NETO:",
                                        {
                                            text: "$ " +
                                                formatter.format(data.valorArriendo - data.valorCopago),
                                            fontSize: 7,
                                        },
                                    ],
                                    [
                                        "DESCUENTO (-) :",
                                        {
                                            text: "$ " + formatter.format(data.descuento),
                                            fontSize: 7,
                                        },
                                    ],

                                    [
                                        { heights: 6, text: "TRASLADO  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(traslado),
                                            fontSize: 6,
                                        },
                                    ],
                                    [
                                        { heights: 6, text: "DEDUCIBLE  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(deducible),
                                            fontSize: 6,
                                        },
                                    ],
                                    [
                                        { heights: 6, text: "BENCINA  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(bencina),
                                            fontSize: 6,
                                        },
                                    ],
                                    [
                                        { heights: 6, text: "ENGANCHE  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(enganche),
                                            fontSize: 6,
                                        },
                                    ],
                                    [
                                        { heights: 6, text: "SILLA PARA BEBE  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(silla),
                                            fontSize: 6,
                                        },
                                    ],
                                    [
                                        { heights: 6, text: "PASE DIARIO  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(pase),
                                            fontSize: 6,
                                        },
                                    ],
                                    [
                                        { heights: 6, text: "RASTREO SATELITAL  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(rastreo),
                                            fontSize: 6,
                                        },
                                    ],
                                    [
                                        { heights: 6, text: "OTROS  (+)", fontSize: 6 },
                                        {
                                            heights: 6,
                                            text: "$ " + formatter.format(otros),
                                            fontSize: 6,
                                        },
                                    ],

                                    //lista accesorios
                                    [
                                        "TOTAL NETO: \n\n IVA: \n\n TOTAL:",
                                        {
                                            text: `$ ${formatter.format(
                        data.neto
                      )} \n\n $ ${formatter.format(
                        data.iva
                      )} \n\n $ ${formatter.format(data.total)} `,
                                            fontSize: 7,
                                        },
                                    ],
                                    [
                                        { text: "A PAGAR ", fontSize: 10 },
                                        {
                                            text: "$ " + formatter.format(data.total),
                                            fontSize: 10,
                                            bold: true,
                                        },
                                    ],
                                ],
                            },
                        },
                        {
                            columns: [{
                                    margin: [0, 10, 0, 0],
                                    width: 70,
                                    fontSize: 6,
                                    style: "tableExample",
                                    table: {
                                        widths: [40, 3],
                                        body: [
                                            ["Boleta", boleta],
                                            ["Factura", factura],
                                        ],
                                    },
                                },
                                {
                                    margin: [0, 10, 0, 0],
                                    fontSize: 6,
                                    style: "tableExample",
                                    table: {
                                        widths: [85],
                                        body: [
                                            [`Nº Boleta : ${numBoleta}`],
                                            [`Nº Factura: ${numFactura}`],
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            margin: [0, 10, 0, 0],
                            style: "tableExample",
                            fontSize: 6,
                            table: {
                                widths: [46, 45, 46],
                                body: [
                                    [{
                                            text: [
                                                { text: "EFECTIVO \n" },
                                                { alignment: "center", text: efectivo },
                                            ],
                                        },
                                        {
                                            text: [
                                                { text: "CHEQUE \n" },
                                                { alignment: "center", text: cheque },
                                            ],
                                        },
                                        {
                                            text: [
                                                { text: "TARJETA \n" },
                                                { alignment: "center", text: tarjeta },
                                            ],
                                        },
                                    ],
                                ],
                            },
                        },

                        {
                            margin: [0, 10, 0, 0],
                            style: "tableExample",
                            fontSize: 8,
                            table: {
                                widths: [155],
                                body: [
                                    [`DIGITADO POR \n  ${data.vendedor}`]
                                ],
                            },
                        },
                    ],
                ],
            },
            {
                margin: [0, 20, 0, 0],
                width: 521,
                height: 200,
                image: "data:image/jpeg;base64," + image,
            },
            {
                margin: [0, 200, 0, 0],
                fontSize: 7,
                text: [{
                        alignment: "center",
                        text: "CONDICIONES DEL CONTRATO DE ARRIENDO \n\n",
                        fontSize: 10,
                        bold: true,
                    },
                    {
                        text: `Comparecen, por una parte, la Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda, RUT 76.791.832-1, Representada por don Diego Antonio Vargas Garrido Rut: 18.891.594-9, Ambos domiciliados en 1 poniente 4 y 5 norte #1588, en la ciudad de Talca, en adelante, 'el arrendador'. Por otra parte, don ${data.nombre_cliente} , Rut: ${data.rut_cliente}  Dirección: ${data.direccion_cliente} Estado Civil : ${data.estadoCivil_cliente} , Profesión : SIN DATOS teléfono : +569 ${data.telefono_cliente}, en adelante 'el arrendatario', se acuerda lo siguiente:\n \n `,
                    },
                    {
                        text: `PRIMERO: el vehículo individualizado en el anverso, quien lo acepta. El arrendatario declara haber recibido el vehículo en buen estado y conforme al acta de entrega que se firma entre ambas partes, la que declara haber revisado y refleja fielmente el estado en que recibe el vehículo. Será parte integrante de este contrato. \n \n`,
                    },
                    {
                        text: `SEGUNDO: El arriendo regirá hasta el ${data.fecha_recepcion.substr(
              0,
              10
            )} , a las ${data.fecha_recepcion.substr(
              11,
              19
            )} horas. Vencido este plazo, si el arrendatario desea continuar usando el vehículo, deberá obtener una autorización de Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda, y en caso de que el vehículo no sea entregado en el horario pactado, el arrendador queda autorizado para iniciar la denuncia por apropiación indebida ante carabineros de chile o policía de investigaciones. \n \n`,
                    },
                    {
                        text: `TERCERO: En caso que el arrendatario, devolviera el vehículo antes de la terminación del plazo del presente contrato, por la negativa al complimiento del presente contrato, este tendrá que indemnizar al arrendador con una multa ascendiente al 30% del valor total del arriendo, excepcionalmente los clientes que vienen por empresas de remplazo. \n \n`,
                    },
                    {
                        text: `CUARTO: En caso que el trayecto del vehículo sea a Santiago, el arrendatario debe dar cuenta al arrendador, y se recargará el valor del pase diario más iva por día transitado en Santiago. \n \n`,
                    },
                    {
                        text: `QUINTO : El vehículo debe venir a mantención a los ${data.kilometrosMantencion_arriendo} kilómetros, en caso de que el arrendatario se negara a realizar la mantención se le aplicará una multa de un mes de arriendo, además de aquello el arrendador queda autorizado para denunciar el vehículo por apropiación indebida ante Carabineros de Chile y/o Policía de Investigaciones, como también a ser retirado de circulación, quedando estrictamente prohibido ejecutar, realizar o manipular el motor o mantenciones mecánicas y eléctricas del vehículo, de no respetar esta disposición se cobrará la multa ya descrita. \n \n`,
                    },
                    {
                        text: `SEXTO: El arrendatario tendrá un límite de kilómetros a recorrer, el cual será de 5.000 (CINCO MIL) kilómetros mensuales, en caso de que este se exceda dicho kilometraje, la siguiente mantención será de cargo del arrendatario. \n \n`,
                    },
                    {
                        text: `SÉPTIMO: Los vehículos se encuentran asegurados por daños propios y a terceros y la Cía. Aseguradora responde solamente en caso de que los daños causados en accidente de tránsito no le sean imputables al usuario. Si los perjuicios ocasionados fueren de riesgo, dejan en poder de Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda una garantía consistente en $___________________ Con todo el arrendatario responderá de todo daño. \n \n`,
                    },
                    {
                        text: `OCTAVO: Respecto del vehículo arrendado, queda prohibido al arrendatario: \n` +
                            `1. Permitir su manejo por otra persona que el mismo o quien se encuentre expresamente autorizado por Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda.\n` +
                            `2. Destinarlo a un uso distinto de aquel que fuera estipulado según la cláusula décimo primera de este contrato\n` +
                            `3. Cargar el vehículo con mayor peso del estipulado, tirar o empujar otro vehículo o ser usado en labores peligrosas.\n` +
                            `4. Conducirlo bajo la influencia del alcohol, en estado de ebriedad, bajo los efectos de drogas o sin portar licencia de conductor y documentos ordenados por la Ley.\n` +
                            `5. Llevar el vehículo fuera del radio máximo expresado en este contrato o sacarlo del territorio nacional.\n\n`,
                    },
                    {
                        text: `NOVENO : En caso de incurrir el arrendatario en alguno de los casos del artículo anterior se compromete a cancelar, a manera de cláusula penal, una suma igual al doble de la renta de arrendamiento pactada en este contrato, sin contar los recargos por seguro e impuestos. Estos sin perjuicio del precio pactado. \n` +
                            `Si por causa de accidente o robo el vehículo debe ser reparado o, si por violación a las Ordenanzas del Tránsito el vehículo es retenido por las  autoridades, el arrendatario pagará a Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. el importe del alquiler convenido por todo el tiempo que dure la reparación o los trámites legales para la liberación del vehículo, así como todos los gastos en que se incurra.\n\n`,
                    },
                    {
                        text: `DÉCIMO: El arrendatario se obliga a respetar rigurosamente todas las Ordenanzas del Tránsito, indicaciones de Carabineros y Autoridades. Serán de su cargo todas las multas aplicadas por infracciones cometidas por el arrendatario durante el uso del vehículo. En el caso de que se curse una infracción por padrón, por un hecho o culpa del arrendatario durante el tiempo en que el vehículo se encuentre a su cargo y Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. resulte obligado a cancelar, el arrendatario tendrá la obligación de restituirle la suma que pague por dicha multa doblada en su valor.\n\n`,
                    },
                    {
                        text: `DÉCIMO PRIMERO: En caso de que ocurra algún siniestro en el transcurso del arriendo, en que el conductor se encuentre en manifiesto estado de ebriedad o bajos influencias del alcohol o drogas, el arrendatario quedará obligado al pago del total del siniestro, el cual no podrá ser inferior a 500 UF \n \n`,
                    },
                    {
                        text: `DÉCIMO SEGUNDO: En caso de daño en el vehículo, accidente o choque, el arrendatario deberá dar aviso por escrito a Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. dentro de las 24 horas siguientes de ocurrido el hecho. Transcurrido este plazo, el arrendatario resultará único responsable de todos los perjuicios ocasionados, quedando obligado a pagarlos de su peculio personal dentro del lapso de 10 días. En caso de no cumplir, Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. quedará autorizado para hacer efectiva la garantía expresada en la cláusula quinta de este contrato.\n\n`,
                    },
                    {
                        text: `DÉCIMO TERCERO: Si el accidente o siniestro ocurre a más de 200 kilómetros a la redonda de la sucursal ubicada en 1 Poniente 4 y 5 Norte, 1558, Talca, será de cargo al arrendador él gasto de la grúa de traslado.\n\n`,
                    },
                    {
                        text: `DÉCIMO CUARTO: En caso que se deba realizar reparaciones al vehículo arrendado, que fueran por causas de este arriendo, el arrendatario queda obligado a cancelar 3 días de arriendo para poder realizar dichos trabajos.\n\n`,
                    },
                    {
                        text: `DÉCIMO QUINTO: El incumplimiento de una sola de las obligaciones de este contrato que contrae el arrendatario, dará derecho al Arrendador para poner término inmediato al contrato, sin esperar vencimiento de plazo alguno, en la cual se cobra como multa un arriendo igual al de contrato.\n\n`,
                    },
                    {
                        text: `DÉCIMO SEXTO: El arrendatario se obliga a informar a Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. sobre cualquier cambio de su domicilio, el que ha señalado en el contrato, así como ha de indicar como referencia el nombre y domicilio de alguna persona con quien Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. pueda comunicarse en caso de emergencia. Don ______________________________________________ domicilio_____________________ N°________ Ciudad______________________ Fono___________________. \n\n`,
                    },
                    {
                        text: `DÉCIMO SÉPTIMO: Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. no se hace responsable por objetos y/o valores de cualquier especie dejados por el arrendatario en el vehículo. Asimismo, no se responsabiliza por cualquier robo que pudiera sufrir o sus acompañantes. \n\n`,
                    },
                    {
                        text: `DÉCIMO OCTAVO: Las partes declaran haber leído íntegramente este contrato, conocerlo y aceptarlo totalmente. El arrendatario declara expresamente conocer todas y cada una de las cláusulas penales establecidas en este contrato, las que acepta. \n\n`,
                    },
                    {
                        text: `DÉCIMO NOVENO: Para todo lo relacionado con el cumplimiento y ejecución del contrato, las partes fijan domicilio en la ciudad de Talca, prorrogando para ésta la competencia de los Tribunales de Justicia. \n\n`,
                    },
                ],
            },
        ],

        header: (page) => {
            if (page == 1) {
                return firmaPagare();
            } else {
                return {};
            }
        },
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

// PAGARE CONSTRUIDO MANUALMENTE, USAR EN CASO DE ALGUNA MODIFICACION FUTURA
/*
{
                style: 'tableExample',
                table: {
                    body: [
                        [
                            {
                                margin: 10,
                                text: [
                                    {
                                        alignment: "center",
                                        text: "PAGARE \n",
                                        fontSize: 15,
                                        bold: true,
                                    },
                                    { text: 'Yo,____________________________________________________________________,de profesion,_____________________________________________________________________\n\n', fontSize: 7 },
                                    { text: 'domiciliado en _____________________________________________________________________, RUT - C.I.Nº________________________________________________________\n\n', fontSize: 7 },
                                    { text: 'de _______________________________________________________________________,RUT Nº____________________________________________Debo y Pagaré a la orden de\n\n', fontSize: 7 },
                                    { text: 'TERESA DEL CARMEN GARRIDO E HIJOS LTDA. La suma de ______________________________________________________________________________________________\n\n', fontSize: 7 },
                                    { text: '_______________________________________________,($___________________________________________________________________) valor de la pérdida total o parcial del\n\n', fontSize: 7 },
                                    { text: 'vehiculo que dicha firma me arrendará con fecha_____________________________________________________, marca ____________________________________________\n\n', fontSize: 7 },
                                    { text: 'modelo _____________________________________________, año de fabricación ____________________________, patente Nº ________________________________________\n\n', fontSize: 7 },
                                    { text: 'de la Municipalidad de_________________________________________________________________Esta obligación se hará exigible tan pronto se produzca un siniestro \n', fontSize: 7 },
                                    { text: 'del que no responda la CÍA Aseguradora, y podrá ser protestado al día subsiguiente de ocurrido el hecho que origina la pérdida del vehículo.\n\n', fontSize: 7 },
                                    { alignment: "center", text: 'X\n', fontSize: 5 },
                                    { alignment: "center", text: '________________________________________\n', fontSize: 10 },
                                    { alignment: "center", text: 'FIRMA\n', fontSize: 7 },
                                ]
                            }
                        ]
                    ]
                }
            },		
*/

module.exports = contratoPlantilla;