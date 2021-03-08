const sendError = require('../../helpers/sendError');

class ArriendoController {

	constructor({ ArriendoService }) {
		this._arriendoService = ArriendoService;

	}

	async getArriendos(req, res) {
		try {
			const { sucursal, estado } = req.query;
			const arriendos = await this._arriendoService.getArriendos(sucursal, estado);
			res.json({ success: true, data: arriendos });
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async getArriendosActivos(req, res) {
		try {
			const { sucursal, estado } = req.query;
			const arriendos = await this._arriendoService.getArriendosActivos(sucursal, estado);
			res.json({ success: true, data: arriendos });
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async findArriendo(req, res) {
		try {
			const { id } = req.params;
			const arriendo = await this._arriendoService.findArriendo(id);
			if (arriendo) {
				res.json({ success: true, data: arriendo });
			} else {
				res.json({ success: false, msg: "error: arriendo no encontrado", });
			}
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async createArriendo(req, res, next) {
		try {
			const arriendo = req.body;
			const arriendoRepo = await this._arriendoService.createArriendo(arriendo);
			res.json({
				success: true,
				msg: ` arriendo Nº${arriendoRepo.id_arriendo} registrado exitosamente`,
				data: arriendoRepo,
			});
			next();
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async updateStateArriendo(req, res, next) {
		try {
			const payload = req.body;
			const { id } = req.params;
			const arriendoRepo = await this._arriendoService.updateStateArriendo(payload, id);
			res.json({ success: true, msg: "actualizacion exitoso", data: arriendoRepo });
			next();
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async sendCorreoAtraso(req, res, next) {
		try {
			const { id_arriendo, nombre_cliente, correo_cliente } = req.query;
			const responseEmail = await this._arriendoService.sendCorreoAtraso(id_arriendo, nombre_cliente, correo_cliente);
			res.json({ success: true, msg: responseEmail });
			next();
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async updateArriendo(req, res, next) {
		try {
			const arriendo = req.body;
			const { id } = req.params;
			const response = await this._arriendoService.updateArriendo(arriendo, id);
			res.json(response);
			next();
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async modificarTipo(req, res, next) {
		try {
			const { tipo, empresaRemplazo } = req.body;
			const { id } = req.params;
			const userAt = req.headers["userat"];
			const response = await this._arriendoService.modificarTipo(tipo, empresaRemplazo, id, userAt);
			res.json(response);
			next();
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async finalizarArriendos(req, res) {
		try {
			const { sucursal } = req.query;
			const arrayFaltantes = await this._arriendoService.finalizarArriendos(sucursal);
			res.json({ success: true, data: arrayFaltantes });
		} catch (error) {
			sendError(error, req, res);;
		}
	}

	async createRequisitoArriendo(req, res, next) {
		try {
			const files = req.files;
			const { id } = req.params;
			const userAt = req.headers["userat"];
			let payload = {
				id_arriendo: id,
				userAt: userAt,
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
			const requisitoRepo = await this._arriendoService.createRequisitoArriendo(payload);
			res.json({ success: true, data: requisitoRepo });
			next();
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async createGarantia(req, res, next) {
		try {
			const garantia = req.body;
			const garantiaRepo = await this._arriendoService.createGarantia(garantia);
			res.json({ success: true, data: garantiaRepo, msg: "registro exitoso" });
			next();
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async createExtencionArriendo(req, res, next) {
		try {
			const extencion = req.body;
			const extencionRepo = await this._arriendoService.createExtencionArriendo(extencion);
			res.json({ success: true, data: extencionRepo, msg: "extencion creada" });
			next()
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async buscarExtencionesPorArriendo(req, res) {
		try {
			const { id } = req.params;
			const extenciones = await this._arriendoService.buscarExtencionesPorArriendo(id);
			res.json({ success: true, data: extenciones });
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async createContrato(req, res) {
		try {
			const { id_arriendo, base64 } = req.body;
			const userAt = req.headers["userat"];
			const response = await this._arriendoService.createContrato(id_arriendo, userAt, base64);
			res.json(response);
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async createExtencionContrato(req, res) {
		try {
			const { id_extencion, base64 } = req.body;
			const userAt = req.headers["userat"];
			const response = await this._arriendoService.createExtencionContrato(id_extencion, userAt, base64);
			res.json(response);
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async subirContrato(req, res) {
		try {
			const { id } = req.params;
			const documento = req.file.filename;
			const userAt = req.headers["userat"];
			const contrato = await this._arriendoService.subirContrato(id, documento, userAt);
			res.json({ success: true, data: contrato });
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async subirExtencionContrato(req, res) {
		try {
			const { id } = req.params;
			const documento = req.file.filename;
			const userAt = req.headers["userat"];
			const response = await this._arriendoService.subirExtencionContrato(id, documento, userAt);
			res.json(response);
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async generatePDFContrato(req, res) {
		try {
			const payload = req.body;
			const response = await this._arriendoService.generatePDFContrato(payload);
			if (response.success) {
				response.pdfDocGenerator.getBase64((base64) => {
					res.json({
						success: true,
						data: {
							firma: response.firma1,
							base64: base64
						}
					})
				});
			} else {
				res.json(response);
			}
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async generatePDFExtencion(req, res) {
		try {
			const payload = req.body;
			const response = await this._arriendoService.generatePDFExtencion(payload);
			if (response.success) {
				response.pdfDocGenerator.getBase64((base64) => {
					res.json({
						success: true,
						data: {
							firma: response.firma1,
							base64: base64
						},
					});
				});
			} else {
				res.json(response);
			}
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async sendEmailContrato(req, res) {
		try {
			const { id_arriendo } = req.body;
			const responseEmail = await this._arriendoService.sendEmailContrato(id_arriendo);
			res.json({ success: true, msg: responseEmail });
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async sendEmailContratoExtencion(req, res) {
		try {
			const { id_extencion } = req.body;
			const responseEmail = await this._arriendoService.sendEmailContratoExtencion(id_extencion);
			res.json({ success: true, msg: responseEmail });
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async createContacto(req, res, next) {
		try {
			const contacto = req.body;
			const contactoRepo = await this._arriendoService.createContacto(contacto);
			res.json({ success: true, data: contactoRepo });
			next();
		} catch (error) {
			sendError(error, req, res);
		}
	}

	async updateContacto(req, res, next) {
		try {
			const { id } = req.params;
			const contacto = req.body;
			await this._arriendoService.updateContacto(contacto, id);
			res.json({ success: true, msg: "contacto modificado" });
			next();
		} catch (error) {
			sendError(error, req, res);
		}
	}


}

module.exports = ArriendoController;