const PagoArriendoService = require("../services/pagoArriendo.service");
const ArriendoService = require("../services/arriendo.service");
const { sendError, ordenarArrayporFecha } = require("../helpers/components");
class PagoArriendoController {
	constructor() {
		this.servicePagoArriendo = new PagoArriendoService();
		this.serviceArriendo = new ArriendoService();
	}


	async createPagoArriendo(req, res) {
		try {
			const response = req.body;
			const arriendo = await this.serviceArriendo.getFindOne(response.id_arriendo);
			if (arriendo.estado_arriendo == "PENDIENTE" || arriendo.estado_arriendo == "EXTENDIDO") {
				response.dias_pagoArriendo = arriendo.diasActuales_arriendo;
				const pagoArriendo = await this.servicePagoArriendo.postCreate(response);
				res.json({
					success: true,
					pagoArriendo: pagoArriendo,
					msg: "registro exitoso",
				});
			} else {
				res.json({
					success: false,
					msg: "este arriendo ya tiene registrado el pago"
				});
			}
		} catch (error) {
			sendError(error, res);
		}
	}


	async consultarPagosPendientes(req, res) {
		try {
			const arriendo = await this.serviceArriendo.getFindOne(req.params.id);
			const arrayTotalPagos = arriendo.pagosArriendos;
			let arrayPago = [];
			let totalPago = 0;
			arrayTotalPagos.map((pagosArriendo) => {
				const pagos = ordenarArrayporFecha(pagosArriendo.pagos);
				if (pagos[0].estado_pago == "PENDIENTE") {
					totalPago += pagos[0].total_pago;
					arrayPago.push({ pago: pagos[0], pagoArriendo: pagosArriendo })
				}
			})
			if (arrayPago.length <= 0) {
				res.json({
					success: true,
					deuda: false,
					msg: "sin pagos pendientes"
				});
			} else {
				res.json({
					success: true,
					deuda: true,
					data: {
						arrayPago: arrayPago,
						totalPago: totalPago,
						arriendo: arriendo
					}
				});
			}
		} catch (error) {
			sendError(error, res)
		}
	}



}

module.exports = PagoArriendoController;