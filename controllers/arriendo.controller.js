const ArriendoService = require('../services/arriendo.service');
const { sendError } = require("../helpers/components");
class ArriendoController {
	constructor() {
		this.serviceArriendo = new ArriendoService();
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
			const arriendo = await this.serviceArriendo.putUpdateState(response, req.params.id);
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


}

module.exports = ArriendoController;