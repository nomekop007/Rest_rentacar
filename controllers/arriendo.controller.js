const ArriendoService = require('../services/arriendo.service');
const ReemplazoService = require('../services/remplazo.service');
const logo = require.resolve("../utils/images/logo2.png");
const base64 = require("image-to-base64");
const { formatFechahora, sendError, nodemailerTransporter } = require("../helpers/components");
class ArriendoController {
	constructor() {
		this.serviceArriendo = new ArriendoService();
		this.serviceReemplazo = new ReemplazoService();
	}



	async getArriendos(req, res) {
		try {
			//preguntar si el usuario no es administrador
			const { rol, sucursal, estado } = req.query;
			const where = {};
			if (rol != 1) where.id_sucursal = sucursal;
			if (estado) where.estado_arriendo = estado;
			const arriendos = await this.serviceArriendo.getFindAllPublic(where);
			res.json({
				success: true,
				data: arriendos,
			});
		} catch (error) {
			sendError(error, res);
		}
	}

	async getArriendosActivos(req, res) {
		const { rol, sucursal, estado } = req.query;

		const where = {};
		if (rol != 1) where.id_sucursal = sucursal;
		const arriendos = await this.serviceArriendo.getFindAllActivos(where, estado);
		res.json({
			success: true,
			data: arriendos,
		});


	}

	async findArriendo(req, res) {
		try {
			const arriendo = await this.serviceArriendo.getFindOnePublic(req.params.id);
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
			sendError(error, res);
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
			const arriendo = await this.serviceArriendo.postCreate(response);
			res.json({
				success: true,
				msg: ` arriendo Nº${arriendo.id_arriendo} registrado exitosamente`,
				data: arriendo,
			});
			next(arriendo.logging);
		} catch (error) {
			sendError(error, res);
		}
	}


	async updateStateArriendo(req, res, next) {
		try {
			const response = req.body;
			const arriendo = await this.serviceArriendo.putUpdate(response, req.params.id);
			res.json({
				success: true,
				msg: "actualizacion exitoso",
				data: arriendo,
			});
			next(arriendo.logging);
		} catch (error) {
			sendError(error, res);
		}
	}

	async sendCorreoAtraso(req, res) {
		try {
			const { id_arriendo, nombre_cliente, correo_cliente } = req.query;
			const arriendo = await this.serviceArriendo.getFindOne(id_arriendo);
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
		} catch (error) {
			sendError(error, res);
		}
	}

	async updateArriendo(req, res, next) {
		try {
			const arriendo = await this.serviceArriendo.getFindOneMin(req.params.id);
			const estado = arriendo.estado_arriendo;
			if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
				res.json({ success: false, msg: "este arriendo ya esta despachado!" })
				return;
			}
			const data = req.body;
			data.diasAcumulados_arriendo = data.diasActuales_arriendo;
			const arriendoEdit = await this.serviceArriendo.putUpdate(data, req.params.id);
			res.json({ success: true, msg: "arriendo modificado!" });
			next(arriendoEdit.logging);
		} catch (error) {
			sendError(error, res);
		}
	}

	async modificarTipo(req, res) {
		try {
			const { tipo, empresaRemplazo } = req.body;
			const arriendo = await this.serviceArriendo.getFindOneMin(req.params.id);
			const estado = arriendo.estado_arriendo;
			if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
				res.json({ success: false, msg: "este arriendo ya esta despachado!" })
				return;
			}

			let newData = {};
			switch (tipo) {
				//cambiar de particular a reemplazo
				case 1:
					const reemplazo = await this.serviceReemplazo.postCreate({
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
					await this.serviceArriendo.putUpdate(newData, req.params.id);
					break;
				//cambiar de reemplazo a particular
				case 2:
					newData = {
						userAt: req.headers["userat"],
						tipo_arriendo: "PARTICULAR",
						id_remplazo: null,
						rut_cliente: arriendo.remplazo.rut_cliente
					}
					await this.serviceArriendo.putUpdate(newData, req.params.id);
					break;
				//cambiar de empresa de reemplazo 
				case 3:
					newData = {
						userAt: req.headers["userat"],
						codigo_empresaRemplazo: empresaRemplazo
					};
					await this.serviceReemplazo.putUpdate(newData, arriendo.id_remplazo);
					break;
			}
			res.json({ success: true, msg: "arriendo modificado!" });
		} catch (error) {
			sendError(error, res);
		}
	}


}

module.exports = ArriendoController;