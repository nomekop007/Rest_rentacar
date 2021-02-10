const PagoArriendoService = require("../services/pagoArriendo.service");
const ArriendoService = require("../services/arriendo.service");
const { sendError, ordenarArrayporFecha } = require("../helpers/components");
class PagoArriendoController {
	constructor() {
		this._servicePagoArriendo = new PagoArriendoService();
		this._serviceArriendo = new ArriendoService();
	}


	async createPagoArriendo(req, res, next) {
		try {
			const response = req.body;
			const arriendo = await this._serviceArriendo.getFindOne(response.id_arriendo);
			response.dias_pagoArriendo = arriendo.diasActuales_arriendo;
			const pagoArriendo = await this._servicePagoArriendo.postCreate(response);
			res.json({
				success: true,
				pagoArriendo: pagoArriendo,
				msg: "registro exitoso",
			});
			next();
		} catch (error) {
			sendError(error, req, res);
		}
	}


	async consultarPagosArriendo(req, res) {
		try {
			const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
			const arrayTotalPagos = arriendo.pagosArriendos;
			let arrayPago = [];
			let totalPago = 0;
			arrayTotalPagos.map((pagosArriendo) => {
				const pagos = ordenarArrayporFecha(pagosArriendo.pagos);
				totalPago += pagos[0].total_pago;
				arrayPago.push({ pago: pagos[0], pagoArriendo: pagosArriendo })
			})
			res.json({
				success: true,
				deuda: true,
				data: {
					arrayPago: arrayPago,
					totalPago: totalPago,
					arriendo: arriendo
				}
			});
		} catch (error) {
			sendError(error, req, res);
		}
	}



}

module.exports = PagoArriendoController;