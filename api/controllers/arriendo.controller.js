const { nodemailerTransporter, ordenarArrayporFecha, formatFechahora } = require("../helpers/components");
const contratoPlantilla = require("../utils/pdf_plantillas/contratoArriendo");
const extencionPlantilla = require("../utils/pdf_plantillas/extenderArriendo");
const logo = require.resolve("../utils/images/logo2.png");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const base64 = require("image-to-base64");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class ArriendoController {
	constructor({ ArriendoRepository, ContactoRepository, RequisitoRepository, ContratoRepository, ConductorRepository, ExtencionRepository, RemplazoRepository, GarantiaRepository, DocumentoEmpresaRepository, DocumentoClienteRepository, DocumentoConductorRepository, sendError }) {
		this.sendError = sendError;

		//mover
		this._serviceArriendo = ArriendoRepository;
		this._serviceReemplazo = RemplazoRepository;
		this._serviceGarantia = GarantiaRepository;
		this._serviceRequisito = RequisitoRepository;
		this._serviceContrato = ContratoRepository;
		this._serviceContacto = ContactoRepository;
		this._serviceConductor = ConductorRepository;
		this._serviceDocumentoEmpresa = DocumentoEmpresaRepository;
		this._serviceDocumentoCliente = DocumentoClienteRepository;
		this._serviceDocumentoConductor = DocumentoConductorRepository;
		this._serviceExtencion = ExtencionRepository;
	}



	async getArriendos(req, res) {
		try {
			//preguntar si el usuario no es administrador
			const { sucursal, estado } = req.query;
			let where = {};
			if (sucursal) where.id_sucursal = sucursal;
			if (estado) where.estado_arriendo = estado;
			const arriendos = await this._serviceArriendo.getFindAllPublic(where);
			res.json({
				success: true,
				data: arriendos,
			});
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}

	async getArriendosActivos(req, res) {
		try {
			const { sucursal, estado } = req.query;
			const arriendos = await this._serviceArriendo.getFindAllActivos(sucursal, estado);
			res.json({
				success: true,
				data: arriendos,
			});
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}

	async findArriendo(req, res) {
		try {
			const arriendo = await this._serviceArriendo.getFindOnePublic(req.params.id);
			if (arriendo) {
				res.json({
					success: true,
					data: arriendo,
				});
			} else {
				res.json({
					success: false,
					msg: "error: " + "arriendo no encontrado",
				});
			}
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}


	async createArriendo(req, res, next) {
		try {
			const response = req.body;
			switch (response.tipo_arriendo) {
				case "PARTICULAR":
					response.rut_empresa = null;
					response.id_remplazo = null;
					break;
				case "REEMPLAZO":
					response.rut_empresa = null;
					response.rut_cliente = null;
					break;
				case "EMPRESA":
					response.id_remplazo = null;
					response.rut_cliente = null;
					break;
			}
			if (response.rut_conductor2 == "undefined") response.rut_conductor2 = null;
			if (response.rut_conductor3 == "undefined") response.rut_conductor3 = null;
			const arriendo = await this._serviceArriendo.postCreate(response);
			res.json({
				success: true,
				msg: ` arriendo Nº${arriendo.id_arriendo} registrado exitosamente`,
				data: arriendo,
			});
			next();
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}


	async updateStateArriendo(req, res, next) {
		try {
			const response = req.body;
			const arriendo = await this._serviceArriendo.putUpdate(response, req.params.id);
			res.json({
				success: true,
				msg: "actualizacion exitoso",
				data: arriendo,
			});
			next();
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}

	async sendCorreoAtraso(req, res, next) {
		try {
			const { id_arriendo, nombre_cliente, correo_cliente } = req.query;
			const arriendo = await this._serviceArriendo.getFindOne(id_arriendo);
			const mailOptions = {
				from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
				to: correo_cliente,
				subject: "AVISO SOBRE VENCIMIENTO DE ARRIENDO RENT A CAR",
				text: "Se adjunta copia del contrato Rent a Car",
				html: `
                <p>Sr.(a) ${nombre_cliente}:</p>
				<p>Por este medio aviso sobre vencimiento del arriendo que solicito con fecha desde el
				  ${formatFechahora(arriendo.fechaEntrega_arriendo)} hasta el ${formatFechahora(arriendo.fechaRecepcion_arriendo)} por favor póngase en contacto con la sucursal más cercana.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
				<p>Atentamente, Rent a Car Maule Ltda. </p>
				<p>Por favor no responder este correo.</p>
                <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
                `,
			};
			const resp = await nodemailerTransporter.sendMail(mailOptions);
			res.json({ success: true, msg: resp });
			next();
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}

	async updateArriendo(req, res, next) {
		try {
			const arriendo = await this._serviceArriendo.getFindOneMin(req.params.id);
			const estado = arriendo.estado_arriendo;
			if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
				res.json({ success: false, msg: "este arriendo ya esta despachado!" })
				return;
			}
			const data = req.body;
			data.diasAcumulados_arriendo = data.diasActuales_arriendo;
			const arriendoEdit = await this._serviceArriendo.putUpdate(data, req.params.id);
			res.json({ success: true, msg: "arriendo modificado!" });
			next();
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}

	async modificarTipo(req, res, next) {
		try {
			const { tipo, empresaRemplazo } = req.body;
			const arriendo = await this._serviceArriendo.getFindOneMin(req.params.id);
			const estado = arriendo.estado_arriendo;
			if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
				res.json({ success: false, msg: "este arriendo ya esta despachado!" })
				return;
			}

			let newData = {};
			switch (tipo) {
				//cambiar de particular a reemplazo
				case 1:
					const reemplazo = await this._serviceReemplazo.postCreate({
						userAt: req.headers["userat"],
						codigo_empresaRemplazo: empresaRemplazo,
						rut_cliente: arriendo.rut_cliente
					});
					newData = {
						userAt: req.headers["userat"],
						tipo_arriendo: "REEMPLAZO",
						id_remplazo: reemplazo.id_remplazo,
						rut_cliente: null
					}
					await this._serviceArriendo.putUpdate(newData, req.params.id);
					break;
				//cambiar de reemplazo a particular
				case 2:
					newData = {
						userAt: req.headers["userat"],
						tipo_arriendo: "PARTICULAR",
						id_remplazo: null,
						rut_cliente: arriendo.remplazo.rut_cliente
					}
					await this._serviceArriendo.putUpdate(newData, req.params.id);
					break;
				//cambiar de empresa de reemplazo 
				case 3:
					newData = {
						userAt: req.headers["userat"],
						codigo_empresaRemplazo: empresaRemplazo
					};
					await this._serviceReemplazo.putUpdate(newData, arriendo.id_remplazo);
					break;
			}
			res.json({ success: true, msg: "arriendo modificado!" });
			next();
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}


	async finalizarArriendos(req, res) {
		try {
			const { sucursal } = req.query;
			const formatter = new Intl.NumberFormat("CL");
			const arriendos = await this._serviceArriendo.getFindAllRecepcionados(sucursal);
			const arrayFaltantes = [];
			arriendos.forEach(async ({ pagosArriendos, id_arriendo, tipo_arriendo, danioVehiculos }) => {
				let faltante = [];
				let pagos_listos = true;
				let firmas_listas = true;
				let danio_listos = true;
				let i = 1;
				let reemplazo = false;
				pagosArriendos.forEach(({ pagos, contrato }) => {
					if (pagos[0].estado_pago == "PENDIENTE") {
						pagos_listos = false;
						if (tipo_arriendo === "REEMPLAZO" && !reemplazo) {
							faltante.push({ msg: "subir comprobante correspondiente al pago total del arriendo." });
							reemplazo = true;
						}
						if (tipo_arriendo != "REEMPLAZO") {
							faltante.push({ msg: "subir comprobante correspondiente al monto de $ " + formatter.format(pagos[0].total_pago) + "." });
						}
					}
					if (!contrato) {
						firmas_listas = false;
						faltante.push({ msg: `Firmar contrato de la extencion Nº${i} !.` })
						i++;
					};
				});
				danioVehiculos.forEach((danio) => {
					if (danio.estado_danioVehiculo == "PENDIENTE") {
						danio_listos = false;
						faltante.push({ msg: "Subir comprobante del daño del vehiculo!. " });
					}
				});
				//console.log("arriendo Nº" + id_arriendo + " pagos:" + pagos_listos + " firmas:" + firmas_listas + " daños:" + danio_listos);
				if (pagos_listos && firmas_listas && danio_listos) {
					await this._serviceArriendo.putUpdate({ estado_arriendo: "FINALIZADO" }, id_arriendo);
				} else {
					arrayFaltantes.push({ id_arriendo: id_arriendo, falta: faltante })
				}
			})
			res.json({ success: true, data: arrayFaltantes });
		} catch (error) {
			this.sendError(error, req, res);;
		}
	}




	async createRequisitoArriendo(req, res, next) {
		try {
			const files = req.files;
			let data = {
				id_arriendo: req.params.id,
				userAt: req.headers["userat"],
				carnetFrontal_requisito: files.inputCarnetFrontal ? files.inputCarnetFrontal[0].filename : null,
				carnetTrasera_requisito: files.inputCarnetTrasera ? files.inputCarnetTrasera[0].filename : null,
				licenciaConducirFrontal_requisito: files.inputlicenciaFrontal ? files.inputlicenciaFrontal[0].filename : null,
				licenciaConducirTrasera_requisito: files.inputlicenciaTrasera ? files.inputlicenciaTrasera[0].filename : null,
				tarjetaCredito_requisito: files.inputTarjeta ? files.inputTarjeta[0].filename : null,
				chequeGarantia_requisito: files.inputCheque ? files.inputCheque[0].filename : null,
				comprobanteDomicilio_requisito: files.inputComprobante ? files.inputComprobante[0].filename : null,
				cartaRemplazo_requisito: files.inputCartaRemplazo ? files.inputCartaRemplazo[0].filename : null,
				boletaEfectivo_requisito: files.inputBoletaEfectivo ? files.inputBoletaEfectivo[0].filename : null,
				documentoEstatuto_requisito: files.inputEstatuto ? files.inputEstatuto[0].filename : null,
				documentoRol_requisito: files.inputRol ? files.inputRol[0].filename : null,
				documentoVigencia_requisito: files.inputVigencia ? files.inputVigencia[0].filename : null,
				carpetaTributaria_requisito: files.inputCarpetaTributaria ? files.inputCarpetaTributaria[0].filename : null,
				cartaAutorizacion_requisito: files.inputCartaAutorizacion ? files.inputCartaAutorizacion[0].filename : null,
			};
			//buscar los documentos del conductor y cliente , o empresa y si bienen vacios los archivos , se remplazan por lo que estan
			const arriendo = await this._serviceArriendo.getFindOneClients(data.id_arriendo);

			data = await this.requisitoConductor(data, req, arriendo);

			switch (arriendo.tipo_arriendo) {
				case "PARTICULAR":
					data = await this.requisitoParticular(data, req, arriendo);
					break;
				case "REEMPLAZO":
					data = await this.requisitoRemplazo(data, req, arriendo);
					break;
				case "EMPRESA":
					data = await this.requisitoEmpresa(data, req, arriendo);
					break;
			}
			console.log(data)
			const requisito = await this._serviceRequisito.postCreate(data);
			res.json({
				success: true,
				data: requisito,
			});
			next();
		} catch (error) {
			this.sendError(error, req, res);
		}
	}



	async requisitoConductor(data, req, arriendo) {
		let dataDoc = {
			userAt: req.headers["userat"],
			licenciaConducirFrontal: data.licenciaConducirFrontal_requisito,
			licenciaConducirTrasera: data.licenciaConducirTrasera_requisito,
			rut_conductor: arriendo.rut_conductor
		};
		const [doc, created] = await this._serviceDocumentoConductor.postFindOrCreate(dataDoc, dataDoc.rut_conductor);
		// si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
		if (!data.licenciaConducirFrontal_requisito) data.licenciaConducirFrontal_requisito = doc.licenciaConducirFrontal;
		if (!data.licenciaConducirTrasera_requisito) data.licenciaConducirTrasera_requisito = doc.licenciaConducirTrasera;
		//si no existe los documentos en la BD , los reemplaza por los que llegan.
		if (!doc.licenciaConducirFrontal) await this._serviceDocumentoConductor.putUpdate({ licenciaConducirFrontal: dataDoc.licenciaConducirFrontal }, dataDoc.rut_conductor);
		if (!doc.licenciaConducirTrasera) await this._serviceDocumentoConductor.putUpdate({ licenciaConducirTrasera: dataDoc.licenciaConducirTrasera }, dataDoc.rut_conductor);
		return data;
	}


	async requisitoParticular(data, req, arriendo) {
		let dataDoc = {
			userAt: req.headers["userat"],
			carnetFrontal: data.carnetFrontal_requisito,
			carnetTrasera: data.carnetTrasera_requisito,
			comprobanteDomicilio: data.comprobanteDomicilio_requisito,
			rut_cliente: arriendo.rut_cliente
		}
		const [doc, created] = await this._serviceDocumentoCliente.postFindOrCreate(dataDoc, dataDoc.rut_cliente);
		// si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
		if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
		if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
		if (!data.comprobanteDomicilio_requisito) data.comprobanteDomicilio_requisito = doc.comprobanteDomicilio;
		//si no existe los documentos en la BD , los reemplaza por los que llegan.
		if (!doc.carnetFrontal) await this._serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_cliente);
		if (!doc.carnetTrasera) await this._serviceDocumentoCliente.putUpdate({ carnetTrasera: dataDoc.carnetTrasera }, dataDoc.rut_cliente);
		if (!doc.comprobanteDomicilio) await this._serviceDocumentoCliente.putUpdate({ comprobanteDomicilio: dataDoc.comprobanteDomicilio }, dataDoc.rut_cliente);
		return data;
	}


	async requisitoRemplazo(data, req, arriendo) {
		let dataDoc = {
			userAt: req.headers["userat"],
			carnetFrontal: data.carnetFrontal_requisito,
			carnetTrasera: data.carnetTrasera_requisito,
			comprobanteDomicilio: data.comprobanteDomicilio_requisito,
			rut_cliente: arriendo.remplazo.cliente.rut_cliente
		}
		const [doc, created] = await this._serviceDocumentoCliente.postFindOrCreate(dataDoc, dataDoc.rut_cliente);
		// si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
		if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
		if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
		if (!data.comprobanteDomicilio_requisito) data.comprobanteDomicilio_requisito = doc.comprobanteDomicilio;
		//si no existe los documentos en la BD , los reemplaza por los que llegan.
		if (!doc.carnetFrontal) await this._serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_cliente);
		if (!doc.carnetTrasera) await this._serviceDocumentoCliente.putUpdate({ carnetTrasera: dataDoc.carnetTrasera }, dataDoc.rut_cliente);
		if (!doc.comprobanteDomicilio) await this._serviceDocumentoCliente.putUpdate({ comprobanteDomicilio: dataDoc.comprobanteDomicilio }, dataDoc.rut_cliente);
		return data;
	}


	async requisitoEmpresa(data, req, arriendo) {
		let dataDoc = {
			userAt: req.headers["userat"],
			carnetFrontal: data.carnetFrontal_requisito,
			carnetTrasera: data.carnetTrasera_requisito,
			documentoEstatuto: data.documentoEstatuto_requisito,
			documentoRol: data.documentoRol_requisito,
			documentoVigencia: data.documentoVigencia_requisito,
			rut_empresa: arriendo.rut_empresa
		}
		const [doc, created] = await this._serviceDocumentoEmpresa.postFindOrCreate(dataDoc, dataDoc.rut_empresa);
		// si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
		if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
		if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
		if (!data.documentoEstatuto_requisito) data.documentoEstatuto_requisito = doc.documentoEstatuto;
		if (!data.documentoRol_requisito) data.documentoRol_requisito = doc.documentoRol;
		if (!data.documentoVigencia_requisito) data.documentoVigencia_requisito = doc.documentoVigencia;
		//si no existe los documentos en la BD , los reemplaza por los que llegan.
		if (!doc.carnetFrontal) await this._serviceDocumentoEmpresa.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_empresa);
		if (!doc.carnetTrasera) await this._serviceDocumentoEmpresa.putUpdate({ carnetTrasera: dataDoc.carnetTrasera }, dataDoc.rut_empresa);
		if (!doc.documentoEstatuto) await this._serviceDocumentoEmpresa.putUpdate({ documentoEstatuto: dataDoc.documentoEstatuto }, dataDoc.rut_empresa);
		if (!doc.documentoRol) await this._serviceDocumentoEmpresa.putUpdate({ documentoRol: dataDoc.documentoRol }, dataDoc.rut_empresa);
		if (!doc.documentoVigencia) await this._serviceDocumentoEmpresa.putUpdate({ documentoVigencia: dataDoc.documentoVigencia }, dataDoc.rut_empresa);
		return data;
	}



	async createGarantia(req, res, next) {
		try {
			const response = req.body;
			switch (response.id_modoPago) {
				case "EFECTIVO":
					response.id_modoPago = 1;
					response.numeroTarjeta_garantia = null;
					response.fechaTarjeta_garantia = null;
					response.codigoTarjeta_garantia = null;
					response.numeroCheque_garantia = null;
					response.codigoCheque_garantia = null;
					response.folioTarjeta_garantia = null;
					response.bancoCheque_garantia = null;
					break;
				case "CHEQUE":
					response.id_modoPago = 2;
					response.monto_garantia = null;
					response.numeroTarjeta_garantia = null;
					response.fechaTarjeta_garantia = null;
					response.codigoTarjeta_garantia = null;
					response.folioTarjeta_garantia = null;
					break;
				case "TARJETA":
					response.id_modoPago = 3;
					response.numeroCheque_garantia = null;
					response.codigoCheque_garantia = null;
					response.bancoCheque_garantia = null;
					break;
			}
			const garantia = await this._serviceGarantia.postCreate(response);
			res.json({
				success: true,
				data: garantia,
				msg: "registro exitoso",
			});
			next();
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async createExtencionArriendo(req, res, next) {
		try {

			console.log(req.body);
			const extencion = await this._serviceExtencion.postCreate(req.body);
			res.json({ success: true, data: extencion, msg: "extencion creada" });
			next()
		} catch (error) {
			this.sendError(error, req, res);
		}
	}

	async buscarExtencionesPorArriendo(req, res) {
		try {
			const extenciones = await this._serviceExtencion.getFindAllWithArrindo(req.params.id);
			res.json({ success: true, data: extenciones });
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async createContrato(req, res) {
		try {
			const response = req.body;
			const arriendo = await this._serviceArriendo.getFindOne(response.id_arriendo);
			const nameFile = uuidv4();
			const pathFile = path.join(__dirname, `${process.env.PATH_CONTRATO}/${nameFile}.pdf`)
			fs.writeFileSync(pathFile, response.base64, "base64", (err) => {
				res.json({
					success: false,
					msg: err
				});
				return;
			});
			//guarda el ultimo pago en el contrato
			const arrayPagos = ordenarArrayporFecha(arriendo.pagosArriendos);
			const fila = arrayPagos.length - 1;
			const dataContrato = {
				documento: nameFile + ".pdf",
				id_pagoArriendo: arrayPagos[fila].id_pagoArriendo,
				id_arriendo: arriendo.id_arriendo,
				userAt: req.headers["userat"]
			}
			const contrato = await this._serviceContrato.postCreate(dataContrato);
			res.json({
				success: true,
				data: contrato,
			});
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async createExtencionContrato(req, res) {
		try {
			const { id_extencion, base64 } = req.body;
			const extencion = await this._serviceExtencion.findOne(id_extencion);
			const nameFile = uuidv4();
			const pathFile = path.join(__dirname, `${process.env.PATH_CONTRATO}/${nameFile}.pdf`)
			fs.writeFileSync(pathFile, base64, "base64", (err) => {
				res.json({
					success: false,
					msg: err
				});
				return;
			});
			const data = {
				documento: nameFile + ".pdf",
				id_pagoArriendo: extencion.id_pagoArriendo,
				id_arriendo: extencion.id_arriendo,
				userAt: req.headers["userat"],
			};
			const contrato = await this._serviceContrato.postCreate(data);
			await this._serviceExtencion.putUpdateById({ id_contrato: contrato.id_contrato, estado_extencion: "FIRMADO" }, id_extencion);
			res.json({
				success: true,
				data: contrato,
			});
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async subirContrato(req, res) {
		try {
			const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
			const arrayPagos = ordenarArrayporFecha(arriendo.pagosArriendos);
			const fila = arrayPagos.length - 1;
			const data = {
				documento: req.file.filename,
				id_pagoArriendo: arrayPagos[fila].id_pagoArriendo,
				id_arriendo: req.params.id,
				userAt: req.headers["userat"],
			};
			const contrato = await this._serviceContrato.postCreate(data);
			res.json({
				success: true,
				data: contrato
			});
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async subirExtencionContrato(req, res) {
		try {
			const extencion = await this._serviceExtencion.findOne(req.params.id);
			if (extencion.estado_extencion == "FIRMADO") {
				res.json({ success: false, msg: "este contrato ya esta firmada!" });
				return;
			}
			const data = {
				documento: req.file.filename,
				id_pagoArriendo: extencion.id_pagoArriendo,
				id_arriendo: extencion.id_arriendo,
				userAt: req.headers["userat"],
			};
			const contrato = await this._serviceContrato.postCreate(data);
			await this._serviceExtencion.putUpdateById({
				id_contrato: contrato.id_contrato,
				estado_extencion: "FIRMADO"
			}, req.params.id);
			res.json({ success: true, data: contrato });
		} catch (error) {
			this.sendError(error, req, res);
		}
	}



	async generatePDFContrato(req, res) {
		try {
			const response = req.body;
			const arriendo = await this._serviceArriendo.getFindOne(response.id_arriendo);
			//si existen mas conductores los busca
			if (arriendo.rut_conductor2) response.conductor2 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor2);
			if (arriendo.rut_conductor3) response.conductor3 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor3);
			// si no hay garantia&archivos, se detiene
			if (!arriendo.requisito) {
				res.json({ success: false, msg: "falta subir archivos requeridos!" });
				return;
			}
			//si no es uno de estos estados, se detiene
			if (arriendo.estado_arriendo != "CONFIRMADO" && arriendo.estado_arriendo != "E-CONFIRMADO") {
				res.json({ success: false, msg: "el documento esta firmado!" });
				return;
			}
			// si el primer pago no esta pagado , se detiene
			if (arriendo.tipo_arriendo != "REEMPLAZO" && arriendo.estado_arriendo == "CONFIRMADO") {
				console.log(arriendo.pagosArriendos[0].pagos[0].estado_pago);
				if (arriendo.pagosArriendos[0].pagos[0].estado_pago != "PAGADO") {
					res.json({ success: false, msg: "se debe subir el comprobante de pago antes de firmar el contrato!" });
					return;
				}
			}
			response.arriendo = arriendo;
			//se genera el documento
			const docDefinition = await contratoPlantilla(response);
			const pdfDocGenerator = pdfMake.createPdf(docDefinition);
			pdfDocGenerator.getBase64((base64) => {
				res.json({
					success: true,
					data: {
						firma: response.firmaClientePNG,
						base64: base64
					},
				});
			});
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async generatePDFExtencion(req, res) {
		try {
			const response = req.body;
			const extencion = await this._serviceExtencion.findOne(response.id_extencion);
			const arriendo = await this._serviceArriendo.getFindOne(extencion.id_arriendo);
			//si existen mas conductores los busca
			if (arriendo.rut_conductor2) response.conductor2 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor2);
			if (arriendo.rut_conductor3) response.conductor3 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor3);
			response.arriendo = arriendo;
			response.extencion = extencion;
			//se genera el documento
			const docDefinition = await extencionPlantilla(response);
			const pdfDocGenerator = pdfMake.createPdf(docDefinition);
			pdfDocGenerator.getBase64((base64) => {
				res.json({
					success: true,
					data: {
						firma: response.firmaClientePNG,
						base64: base64
					},
				});
			});
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async sendEmailContrato(req, res) {
		try {
			const response = req.body;
			const arriendo = await this._serviceArriendo.getFindOneMin(response.id_arriendo);
			const client = {};
			//funcion para ordenar el array de pagos por fecha de creacion y poner el mas nuevo al final
			const contratos = ordenarArrayporFecha(arriendo.contratos);
			switch (arriendo.tipo_arriendo) {
				case "PARTICULAR":
					client.name = arriendo.cliente.nombre_cliente;
					client.correo = arriendo.cliente.correo_cliente;
					break;
				case "REEMPLAZO":
					client.name = arriendo.remplazo.cliente.nombre_cliente;
					client.correo = arriendo.remplazo.cliente.correo_cliente;
					break;
				case "EMPRESA":
					client.name = arriendo.empresa.nombre_empresa;
					client.correo = arriendo.empresa.correo_empresa;
					break;
			}

			//datos del mensaje y su destinatario
			const mailOptions = {
				from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
				to: client.correo,
				bcc: process.env.CORREO_SUPERVISOR,
				subject: "COPIA DE CONTRATO RENT A CAR",
				text: "Se adjunta copia del contrato Rent a Car",
				html: `
                <p>Sr.(a) ${client.name}:</p>
                <p>Por este medio envio su copia del contrato de arriendo de Rent a Car.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
                <p>Atentamente, Rent a Car Maule Ltda. </p>
                <p>Por favor no responder este correo.</p>
                <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
                `,
				attachments: [{
					filename: "CONSTRATO.pdf",
					contentType: "pdf",
					path: path.join(__dirname, `${process.env.PATH_CONTRATO}/${contratos[contratos.length - 1].documento}`)
				},],
			};
			const resp = await nodemailerTransporter.sendMail(mailOptions);
			res.json({
				success: true,
				msg: resp,
			});
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async sendEmailContratoExtencion(req, res) {
		try {
			const { id_extencion } = req.body;
			const extencion = await this._serviceExtencion.findOne(id_extencion);
			const arriendo = await this._serviceArriendo.getFindOneMin(extencion.id_arriendo);
			const client = {};
			//funcion para ordenar el array de pagos por fecha de creacion y poner el mas nuevo al final
			switch (arriendo.tipo_arriendo) {
				case "PARTICULAR":
					client.name = arriendo.cliente.nombre_cliente;
					client.correo = arriendo.cliente.correo_cliente;
					break;
				case "REEMPLAZO":
					client.name = arriendo.remplazo.cliente.nombre_cliente;
					client.correo = arriendo.remplazo.cliente.correo_cliente;
					break;
				case "EMPRESA":
					client.name = arriendo.empresa.nombre_empresa;
					client.correo = arriendo.empresa.correo_empresa;
					break;
			}
			//datos del mensaje y su destinatario
			const mailOptions = {
				from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
				to: client.correo,
				bcc: process.env.CORREO_SUPERVISOR,
				subject: "COPIA DE CONTRATO RENT A CAR",
				text: "Se adjunta copia del contrato Rent a Car",
				html: `
                <p>Sr.(a) ${client.name}:</p>
                <p>Por este medio envio su copia del contrato de arriendo de Rent a Car.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
                <p>Atentamente, Rent a Car Maule Ltda. </p>
                <p>Por favor no responder este correo.</p>
                <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
                `,
				attachments: [{
					filename: "CONSTRATO.pdf",
					contentType: "pdf",
					path: path.join(__dirname, `${process.env.PATH_CONTRATO}/${extencion.contrato.documento}`)
				},],
			};
			const resp = await nodemailerTransporter.sendMail(mailOptions);
			res.json({ success: true, msg: resp });
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


	async createContacto(req, res, next) {
		try {
			const response = req.body;
			const contacto = await this._serviceContacto.postCreate(response);
			res.json({
				success: true,
				data: contacto,
			});
			next();
		} catch (error) {
			this.sendError(error, req, res);
		}
	}

	async updateContacto(req, res, next) {
		try {
			await this._serviceContacto.putUpdate(req.body, req.params.id);
			res.json({
				success: true,
				msg: "contacto modificado"
			});
			next();
		} catch (error) {
			this.sendError(error, req, res);
		}
	}


}

module.exports = ArriendoController;