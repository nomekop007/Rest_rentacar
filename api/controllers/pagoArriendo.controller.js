
const { ordenarArrayporFecha } = require("../helpers/components");
class PagoArriendoController {

	constructor({ PagoArriendoService, ArriendoService, sendError }) {
		this._servicePagoArriendo = PagoArriendoService;
		this._serviceArriendo = ArriendoService;
		this.sendError = sendError;
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
			this.sendError(error, req, res);
		}
	}


	async consultarPagosArriendo(req, res) {
		try {
			let totalPago = 0;
			const arriendo = await this._serviceArriendo.getFindOne(req.params.id);

			let arrayPago = [];
			let arrayTotalPagos = arriendo.pagosArriendos;
			let arrayPagoExtra = arriendo.pagosExtras;
			let arrayPagoDanio = arriendo.danioVehiculos;

			if (arrayPagoDanio.length > 0) {
				arrayPagoDanio.forEach(({ pagosDanio }) => {
					if (pagosDanio) {
						totalPago += pagosDanio.precioTotal_pagoDanio;
					}
				})
			}

			if (arrayPagoExtra.length > 0) { } {
				arrayPagoExtra.forEach(({ monto_pagoExtra }) => {
					totalPago += monto_pagoExtra;
				})
			}


			arrayTotalPagos.forEach((pagosArriendo) => {
				const pagos = ordenarArrayporFecha(pagosArriendo.pagos);
				totalPago += pagos[0].total_pago;
				arrayPago.push({ pago: pagos[0], pagoArriendo: pagosArriendo })
			})
			res.json({
				success: true,
				deuda: true,
				data: {
					arrayPago: arrayPago,
					arrayPagoExtra: arrayPagoExtra,
					arrayPagoDanio: arrayPagoDanio,
					totalPago: totalPago,
					arriendo: arriendo
				}
			});
		} catch (error) {
			this.sendError(error, req, res);
		}
	}



}

module.exports = PagoArriendoController;