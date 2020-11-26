const base64 = require("image-to-base64");
const {
	fechahorafirma,
	formatFechahora,
	formatFecha,
	ordenarArrayporFecha
} = require("../../helpers/components");
const pagare = require.resolve("../images/pagare.png");
const logo = require.resolve("../images/logo.png");

async function contratoPlantilla(data) {
	//clase para cambiar numeros a monedas
	const formatter = new Intl.NumberFormat("CL");

	//funcion para ordenar el array de pagos por fecha de creacion y poner el mas nuevo al final
	const pagosArriendos = ordenarArrayporFecha(data.arriendo.pagosArriendos);




	//P es lo del pago al cual pertenece el contrato X

	const doc = {
		P: pagosArriendos.length - 1,
		extencion: "",
		conductores: {
			nombre1: "",
			nombre2: "",
			nombre3: "",
			conductor1: "",
			conductor2: "",
			conductor3: "",
		},
		cliente: {
			nombre_cliente: "",
			nacionalidad_cliente: "",
			direccion_cliente: "",
			ciudad_cliente: "",
			comuna_cliente: "",
			rut_cliente: "",
			nacimiento_cliente: "",
			telefono_cliente: "",
			estado_civil: "",
		},
		pago: {
			boletaX: "",
			facturaX: "",
			codigoBoleta: "",
			codigoFactura: "",
			efectivoX: "",
			chequeX: "",
			tarjetaX: "",
			TrasferenciaX: "",
			observaciones: "",
		},
		remplazo: {
			codigo: "",
			valorCopago: ""
		},
		garantia: {
			numero_tarjeta: "",
			fecha_tarjeta: "",
			codigo_tarjeta: "",
			garantiaTarjeta: "",
			numero_cheque: "",
			codigo_cheque: "",
			garantiaEfectivo: "",
		},
		accesorios: {
			traslado: 0,
			deducible: 0,
			bencina: 0,
			enganche: 0,
			silla: 0,
			pase: 0,
			rastreo: 0,
			otros: 0,
		},
		fechaInicio: formatFechahora(data.arriendo.fechaEntrega_arriendo),
		fechaFin: formatFechahora(data.arriendo.fechaRecepcion_arriendo),
	};

	if (pagosArriendos.length > 1) {
		//significa que este no es el primer contrato del arriendo y es una extencion
		doc.extencion = "EXTENCION - " + (pagosArriendos.length - 1);
	}


	const arrayAccesorios = pagosArriendos[doc.P].pagosAccesorios;

	const mostrarAccesorios = () => {
		if (arrayAccesorios.length > 0) {
			let array = [];
			for (let i = 0; i < arrayAccesorios.length; i++) {
				array.push(
					[
						{ heights: 6, text: ` ${arrayAccesorios[i].accesorio.nombre_accesorio} (+)`, fontSize: 5 },
						{
							heights: 6,
							text: "$ " + formatter.format(arrayAccesorios[i].precioVenta_pagoAccesorio),
							fontSize: 7,
						},
					],
				)
			}
			return {
				margin: [0, 1, 0, 1],
				fontSize: 6,
				style: `tableExample`,
				table: {
					widths: [73, 73],
					body: array
				},
			}
		}
		return {
			margin: [0, 1, 0, 1],
			fontSize: 6,
			style: `tableExample`,
			table: {
				widths: [73, 73],
				body: [
					[{
						alignment: "center",
						text: `SIN ACCESORIOS`,
						colSpan: 2,
					},
					{},
					],
				]
			},
		}
	}


	const tipoArriendo = data.arriendo.tipo_arriendo;
	switch (tipoArriendo) {
		case "PARTICULAR":
			const cliente = data.arriendo.cliente;
			doc.cliente.nombre_cliente = cliente.nombre_cliente;
			doc.cliente.nacionalidad_cliente = cliente.nacionalidad_cliente;
			doc.cliente.rut_cliente = cliente.rut_cliente.replace("@", '');
			doc.cliente.ciudad_cliente = cliente.ciudad_cliente;
			doc.cliente.comuna_cliente = cliente.comuna_cliente;
			doc.cliente.direccion_cliente = cliente.direccion_cliente;
			doc.cliente.estado_civil = cliente.estadoCivil_cliente;
			doc.cliente.telefono_cliente = cliente.telefono_cliente;
			doc.cliente.nacimiento_cliente = formatFecha(
				cliente.fechaNacimiento_cliente
			);
			break;
		case "REEMPLAZO":
			const remplazo = data.arriendo.remplazo.cliente;
			const pagoRemplazo = data.arriendo.pagosArriendos[doc.P];
			doc.cliente.nombre_cliente = remplazo.nombre_cliente;
			doc.cliente.nacionalidad_cliente = remplazo.nacionalidad_cliente;
			doc.cliente.rut_cliente = remplazo.rut_cliente.replace("@", '');
			doc.cliente.ciudad_cliente = remplazo.ciudad_cliente;
			doc.cliente.direccion_cliente = remplazo.direccion_cliente;
			doc.cliente.comuna_cliente = remplazo.comuna_cliente;
			doc.cliente.estado_civil = remplazo.estadoCivil_cliente;
			doc.cliente.telefono_cliente = remplazo.telefono_cliente;
			doc.cliente.nacimiento_cliente = formatFecha(
				remplazo.fechaNacimiento_cliente
			);
			doc.remplazo.codigo = "";
			doc.remplazo.valorCopago = "$ " + formatter.format(pagoRemplazo.valorCopago_pagoArriendo);
			break;
		case "EMPRESA":
			const empresa = data.arriendo.empresa;
			doc.cliente.nombre_cliente = empresa.nombre_empresa;
			doc.cliente.rut_cliente = empresa.rut_empresa;
			doc.cliente.ciudad_cliente = empresa.ciudad_empresa;
			doc.cliente.comuna_cliente = empresa.comuna_empresa;
			doc.cliente.direccion_cliente = empresa.direccion_empresa;
			doc.cliente.telefono_cliente = empresa.telefono_empresa;
			doc.cliente.nacimiento_cliente = empresa.vigencia_empresa;
			break;
	}

	const garantia = data.arriendo.garantia;
	switch (garantia.modosPago.id_modoPago) {
		case 1:
			doc.garantia.garantiaEfectivo =
				"$ " + formatter.format(garantia.monto_garantia);
			break;
		case 2:
			doc.garantia.numero_cheque = garantia.numeroCheque_garantia;
			doc.garantia.codigo_cheque = garantia.codigoCheque_garantia;
			break;
		case 3:
			doc.garantia.numero_tarjeta = "************" + garantia.numeroTarjeta_garantia.slice(-4);
			doc.garantia.codigo_tarjeta = garantia.codigoTarjeta_garantia;
			doc.garantia.fecha_tarjeta = garantia.fechaTarjeta_garantia;
			doc.garantia.garantiaTarjeta =
				"$ " + formatter.format(garantia.monto_garantia);
			break;
	}

	const facturacion = data.arriendo.pagosArriendos[doc.P].pagos[0].facturacione;
	if (facturacion) {
		switch (facturacion.tipo_facturacion) {
			case "BOLETA":
				doc.pago.boletaX = "X";
				doc.pago.codigoBoleta = facturacion.numero_facturacion;
				break;
			case "FACTURA":
				doc.pago.facturaX = "X";
				doc.pago.codigoFactura = facturacion.numero_facturacion;
				break;
		}
		switch (facturacion.modosPago.id_modoPago) {
			case 1:
				doc.pago.efectivoX = "X";
				break;
			case 2:
				doc.pago.chequeX = "X";
				break;
			case 3:
				doc.pago.tarjetaX = "X";
				break;
			case 4:
				doc.pago.TrasferenciaX = "X";
				break;
		}
	}

	doc.conductores.nombre1 = `CONDUCTOR : ${data.arriendo.conductore.nombre_conductor} \n`;
	doc.conductores.conductor1 = `
    RUT: ${data.arriendo.conductore.rut_conductor.replace("@", '')}  ---  NACIONALIDAD: ${data.arriendo.conductore.nacionalidad_conductor} ---  CLASE :  ${data.arriendo.conductore.clase_conductor} 
    NUMERO:  ${data.arriendo.conductore.numero_conductor}  ---  VCTO: ${formatFecha(data.arriendo.conductore.vcto_conductor)} ---  TELEFONO:  +569 ${data.arriendo.conductore.telefono_conductor}
    MUNIC: ${data.arriendo.conductore.municipalidad_conductor}  ---  DIRECCION: ${data.arriendo.conductore.direccion_conductor}
    ____________________________________________________________________________________
    `;


	if (data.conductor2) {
		doc.conductores.nombre2 = `CONDUCTOR 2 : ${data.conductor2.nombre_conductor} \n`;
		doc.conductores.conductor2 = `
        RUT: ${data.conductor2.rut_conductor.replace("@", '')} ---  NACIONALIDAD: ${data.conductor2.nacionalidad_conductor}  ---  CLASE :  ${data.conductor2.clase_conductor} 
        NUMERO:  ${data.conductor2.numero_conductor}  ---  VCTO: ${formatFecha(data.conductor2.vcto_conductor)}  ---  TELEFONO:  +569 ${data.conductor2.telefono_conductor}
        MUNIC: ${data.conductor2.municipalidad_conductor}  ---   DIRECCION: ${data.conductor2.direccion_conductor}
        `;
	}


	if (data.conductor3) {
		doc.conductores.nombre3 = `CONDUCTOR 3 : ${data.conductor3.nombre_conductor} `;
		doc.conductores.conductor3 = `____________________________________________________________________________________
        RUT: ${data.conductor3.rut_conductor.replace("@", '')}  ---   NACIONALIDAD: ${data.conductor3.nacionalidad_conductor}  ---  CLASE :  ${data.conductor3.clase_conductor} 
        NUMERO:  ${data.conductor3.numero_conductor}  ---  VCTO: ${formatFecha(data.conductor3.vcto_conductor)}  ---  TELEFONO:  +569 ${data.conductor3.telefono_conductor}
        MUNIC: ${data.conductor3.municipalidad_conductor}  ---   DIRECCION: ${data.conductor3.direccion_conductor}`;
	}




	const firmaCliente = () => {
		if (data.firmaClientePNG) {
			return {
				alignment: "center",
				width: 171,
				height: 71,
				image: data.firmaClientePNG,
			};
		} else {
			return {
				margin: [0, 80, 0, 0],
				alignment: "center",
				text: "",
			};
		}
	};
	const firmaUsuario = () => {
		if (data.firmaUsuarioPNG) {
			return {
				alignment: "center",
				width: 171,
				height: 71,
				image: data.firmaUsuarioPNG,
			};
		} else {
			return {
				margin: [0, 80, 0, 0],
				alignment: "center",
				text: "",
			};
		}
	}



	const firmaPagare = () => {
		if (data.firmaClientePNG) {
			return {
				margin: [400, 710, 0, 0],
				width: 150,
				height: 70,
				image: data.firmaClientePNG,
			};
		} else {
			return {};
		}
	};
	const fechaHoraFirma = () => {
		if (data.firmaClientePNG) {
			return {
				alignment: "center",
				text: `${fechahorafirma()}
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
				image: "data:image/png;base64," + (await base64(logo)),
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
				text: [{
					text: `Nº  ${data.arriendo.id_arriendo} \n`,
				},
				{
					fontSize: 8,
					text: `${doc.extencion}`
				}
				]
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
							[{
								text: `CLIENTE: \n ${doc.cliente.nombre_cliente}`,
								colSpan: 2,
							},
							{},
							{
								text: `NACIONALIDAD: \n ${doc.cliente.nacionalidad_cliente}`,
								colSpan: 2,
							},
							{},
							{
								text: `AUTO/CAMIONETA: \n ${data.arriendo.vehiculo.tipo_vehiculo}`,
								colSpan: 1,
							},
							],
							[{
								text: `DIRECCION: \n ${doc.cliente.direccion_cliente}`,
								colSpan: 3,
							},
							{},
							{},
							{
								text: `CIUDAD: \n ${doc.cliente.ciudad_cliente}`,
								colSpan: 1,
							},
							{
								text: `MARCA MODELO: \n ${data.arriendo.vehiculo.marca_vehiculo}  ${data.arriendo.vehiculo.modelo_vehiculo}`,
								colSpan: 1,
							},
							],
							[{
								text: `RUT O PASAPORTE: \n ${doc.cliente.rut_cliente}`,
								colSpan: 2,
							},
							{},
							{
								text: `NACIMIENTO: \n ${doc.cliente.nacimiento_cliente}`,
								colSpan: 1,
							},
							{
								text: `TELEFONO: \n +569 ${doc.cliente.telefono_cliente}`,
								colSpan: 1,
							},
							{
								text: `PATENTE: \n ${data.arriendo.vehiculo.patente_vehiculo}`,
								colSpan: 1,
							},
							],
							[{
								text: `${doc.conductores.nombre1} ${doc.conductores.nombre2} ${doc.conductores.nombre3}`,
								colSpan: 5,
							},
							{},
							{},
							{},
							{},
							],
							[
								{ text: `LICENCIA`, colSpan: 1, fontSize: 9 },
								{
									text: `${doc.conductores.conductor1} ${doc.conductores.conductor2} ${doc.conductores.conductor3}
                                    `,
									fontSize: 6,
									colSpan: 3,
								},
								{
								},
								{},
								{
									text: `KILOMETROS:
                                    
                                    DESPACHO: ${data.arriendo.kilometrosEntrada_arriendo} 
                                    _______________________
                                    RECEPCION:  ********     `,
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
								text: `TARJETA DE CREDITO: \n ${doc.garantia.numero_tarjeta}`,
								colSpan: 1,
							},

							{
								text: `FECHA VENCIMIENTO \n ${doc.garantia.fecha_tarjeta}`,
								colSpan: 1,
							},
							{
								text: `CODIGO \n ${doc.garantia.codigo_tarjeta}`,
								colSpan: 1,
							},
							{
								text: `MONTO  \n ${doc.garantia.garantiaTarjeta}`,
								colSpan: 1,
							},
							],
							[{
								text: `CHEQUE Nº: \n  ${doc.garantia.numero_cheque}`,
								colSpan: 2,
							},
							{},
							{
								text: `CODIGO AUTORIZACION \n ${doc.garantia.codigo_cheque}`,
								colSpan: 2,
							},
							{},
							],
							[{
								text: `EFECTIVO: ${doc.garantia.garantiaEfectivo}`,
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
					fontSize: 7,

					style: "tableExample",
					table: {
						heights: 10,
						widths: ["*", "*", "*"],
						body: [
							[
								`AGENCIA DE ARRIENDO:  ${data.arriendo.sucursale.nombre_sucursal}  `,
								`VENDEDOR/A:  ${data.arriendo.usuario.nombre_usuario} `,
								`ACTA DE ENTREGA Nº:  ${data.arriendo.id_arriendo} `,
							],
						],
					},
				},
				{
					columns: [{
						margin: [0, 5, 10, 0],
						fontSize: 5,
						ol: [
							"Acepto íntegramente las condiciones del contrato de acuerdo con tarifas y plazos pactados.",
							"Autorizo a Rent A Car Maule a verificar antecedentes comerciales.",
							"Deducible UF. 20 + IVA Autos y Camionetas.",
							"Deducible pérdida total o volcamiento. 75 UF + IVA para todas las unidades.",

						],
					},
					{
						width: 180,
						fontSize: 6,
						margin: [0, 5, 10, 0],
						text: `Observaciones: \n ${
							data.arriendo.pagosArriendos[doc.P].observaciones_pagoArriendo
							} `,
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
							[
								firmaUsuario(),
								fechaHoraFirma(),
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
								`CIUDAD DE ENTREGA \n ${data.arriendo.ciudadEntrega_arriendo} `,
								`CIUDAD DE RECEPCIÓN \n ${data.arriendo.ciudadRecepcion_arriendo}`,
							],
							[
								`FECHA - HORA \n ${doc.fechaInicio}`,
								`FECHA - HORA \n ${doc.fechaFin}`,
							],
							[{
								text: `TIPO ARRIENDO: \n  ${
									data.arriendo.tipo_arriendo
									} ${
									data.arriendo.remplazo
										? data.arriendo.remplazo.codigo_empresaRemplazo
										: ""
									}`,
								colSpan: 2,
							},
							{},
							],
							[
								"CODIGO:", {
									text: `${doc.remplazo.codigo}`,
									fontSize: 7,
								}
							],
							[
								"VALOR COPAGO $",
								{
									text: `${doc.remplazo.valorCopago}`,
									fontSize: 7,
								}
							],
							[{
								text: `CANTIDAD DE DIAS: \n  ${data.arriendo.diasActuales_arriendo}`,
								colSpan: 2,
							},
							{},
							],
							[
								"SUB TOTAL NETO:",
								{
									text: "$ " +
										formatter.format(
											data.arriendo.pagosArriendos[doc.P].subtotal_pagoArriendo
										),
									fontSize: 7,
								},
							],
							[
								"DESCUENTO (-) :",
								{
									text: "$ " +
										formatter.format(
											data.arriendo.pagosArriendos[doc.P].descuento_pagoArriendo
										),
									fontSize: 7,
								},
							],
						],
					},
				},
				//array de accesorios
				mostrarAccesorios(),
				{
					fontSize: 6,
					style: `tableExample`,
					table: {
						widths: [73, 73],
						body: [
							[
								"TOTAL NETO: \n\n IVA: \n\n TOTAL:",
								{
									text: `$ ${formatter.format(
										data.arriendo.pagosArriendos[doc.P].neto_pagoArriendo
									)} \n\n $ ${formatter.format(
										data.arriendo.pagosArriendos[doc.P].iva_pagoArriendo
									)} \n\n $ ${formatter.format(
										data.arriendo.pagosArriendos[doc.P].total_pagoArriendo
									)} `,
									fontSize: 7,
								},
							],
							[
								{ text: "A PAGAR ", fontSize: 10 },
								{
									text: "$ " +
										formatter.format(data.arriendo.pagosArriendos[doc.P].total_pagoArriendo),
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
								["Boleta", `${doc.pago.boletaX}`],
								["Factura", `${doc.pago.facturaX}`],
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
								[`Nº Boleta : ${doc.pago.codigoBoleta}`],
								[`Nº Factura: ${doc.pago.codigoFactura}`],
							],
						},
					},
					],
				},
				{
					margin: [0, 10, 0, 0],
					style: "tableExample",
					fontSize: 5,
					table: {
						widths: [30, 30, 30, 38],
						body: [
							[{
								text: [
									{ text: "EFECTIVO \n" },
									{ alignment: "center", text: `${doc.pago.efectivoX}` },
								],
							},
							{
								text: [
									{ text: "CHEQUE \n" },
									{ alignment: "center", text: `${doc.pago.chequeX}` },
								],
							},
							{
								text: [
									{ text: "TARJETA \n" },
									{ alignment: "center", text: `${doc.pago.tarjetaX}` },
								],
							},
							{
								text: [
									{ text: "TRANSFERENCIA \n" },
									{ alignment: "center", text: `${doc.pago.TrasferenciaX}` },
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
							[`DIGITADO POR \n  ${data.arriendo.usuario.nombre_usuario}`],
						],
					},
				},
				],
			],
		},
		{
			margin: [0, 10, 0, 0],
			width: 521,
			height: 200,
			image: "data:image/png;base64," + await base64(pagare),
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
				text: `Comparecen, por una parte, la Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda, RUT 76.791.832-1, Representada por don Diego Antonio Vargas Garrido Rut: 18.891.594-9, Ambos domiciliados en 1 poniente 4 y 5 norte #1588, en la ciudad de Talca, en adelante, 'el arrendador'. Por otra parte, don ${doc.cliente.nombre_cliente} , Rut: ${doc.cliente.rut_cliente}  Dirección: ${doc.cliente.direccion_cliente} Estado Civil : ${doc.cliente.estado_civil} , Profesión : SIN DATOS teléfono : +569 ${doc.cliente.telefono_cliente}, en adelante 'el arrendatario', se acuerda lo siguiente:\n \n `,
			},
			{
				text: `PRIMERO: el vehículo individualizado en el anverso, quien lo acepta. El arrendatario declara haber recibido el vehículo en buen estado y conforme al acta de entrega que se firma entre ambas partes, la que declara haber revisado y refleja fielmente el estado en que recibe el vehículo. Será parte integrante de este contrato. \n \n`,
			},
			{
				text: `SEGUNDO: El arriendo regirá hasta el ${doc.fechaFin} horas. Vencido este plazo, si el arrendatario desea continuar usando el vehículo, deberá obtener una autorización de Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda, y en caso de que el vehículo no sea entregado en el horario pactado, el arrendador queda autorizado para iniciar la denuncia por apropiación indebida ante carabineros de chile o policía de investigaciones. \n \n`,
			},
			{
				text: `TERCERO: En caso que el arrendatario, devolviera el vehículo antes de la terminación del plazo del presente contrato, por la negativa al complimiento del presente contrato, este tendrá que indemnizar al arrendador con una multa ascendiente al 30% del valor total del arriendo, excepcionalmente los clientes que vienen por empresas de remplazo. \n \n`,
			},
			{
				text: `CUARTO: En caso que el trayecto del vehículo sea a Santiago, el arrendatario debe dar cuenta al arrendador, y se recargará el valor del pase diario más iva por día transitado en Santiago. \n \n`,
			},
			{
				text: `QUINTO : El vehículo debe venir a mantención a los  ${data.arriendo.vehiculo.kilometrosMantencion_vehiculo}  kilómetros, en caso de que el arrendatario se negara a realizar la mantención se le aplicará una multa de un mes de arriendo, además de aquello el arrendador queda autorizado para denunciar el vehículo por apropiación indebida ante Carabineros de Chile y/o Policía de Investigaciones, como también a ser retirado de circulación, quedando estrictamente prohibido ejecutar, realizar o manipular el motor o mantenciones mecánicas y eléctricas del vehículo, de no respetar esta disposición se cobrará la multa ya descrita. \n \n`,
			},
			{
				text: `SEXTO: El arrendatario tendrá un límite de kilómetros a recorrer, el cual será de 5.000 (CINCO MIL) kilómetros mensuales, en caso de que este se exceda dicho kilometraje, la siguiente mantención será de cargo del arrendatario. \n \n`,
			},
			{
				text: `SÉPTIMO: Los vehículos se encuentran asegurados por daños propios y a terceros y la Cía. Aseguradora responde solamente en caso de que los daños causados en accidente de tránsito no le sean imputables al usuario. Si los perjuicios ocasionados fueren de riesgo, dejan en poder de Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda una garantía consistente en $ ${data.arriendo.garantia.monto_garantia} Con todo el arrendatario responderá de todo daño. \n \n`,
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
				text: `DÉCIMO SEXTO: El arrendatario se obliga a informar a Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. sobre cualquier cambio de su domicilio, el que ha señalado en el contrato, así como ha de indicar como referencia el nombre y domicilio de alguna persona con quien Sociedad Teresa del Carmen Garrido Rojas e Hijos Ltda. pueda comunicarse en caso de emergencia. Don  ${data.arriendo.contacto.nombre_contacto}   domicilio ${data.arriendo.contacto.domicilio_contacto}   N° ${data.arriendo.contacto.numeroCasa_contacto}   Ciudad  ${data.arriendo.contacto.ciudad_contacto}   Fono +569 ${data.arriendo.contacto.telefono_contacto} . \n\n`,
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
			{
				text: `Yo, ${doc.cliente.nombre_cliente}   , RUT  ${doc.cliente.rut_cliente} , Dirección   ${doc.cliente.direccion_cliente}   , Comuna  ${doc.cliente.comuna_cliente}  , Ciudad ${doc.cliente.ciudad_cliente} Autorizo a Teresa del Carmen Garrido Rojas E Hijos Limitada Rut 76.791.832-1, para que en caso de simple retardo, mora o incumplimiento de las obligaciones contraídas en el presente contrato mis datos personales y los demás derivados del presente documento puedan ser tratados y/o comunicados a terceros sin restricciones, en la base de datos del Boletín Electrónico Dicom de EQUIFAX CHILE S.A.`
			}
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
		pageMargins: [40, 20, 40, 20],
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
			title: 'Contrato-Arriendo',
			author: 'Rent A Car maule',
			subject: 'contrato',
			creator: 'nomekop007',
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